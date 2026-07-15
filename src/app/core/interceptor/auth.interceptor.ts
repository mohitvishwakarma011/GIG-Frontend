import {
    HttpEvent, HttpHandler,
    HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { AppUtils } from 'src/app/helpers/app.utils';
import { Constants } from 'src/app/helpers/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null>(null);

    constructor(
        private authService: AuthService,
        private router: Router,
        private readonly _loadingBarService: LoadingBarService,
        private readonly _appUtils: AppUtils
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Skip auth endpoints entirely
        if (this._isAuthEndpoint(req)) {
            return next.handle(req);
        }

        const loaderRef = this._loadingBarService.useRef();
        loaderRef.start();

        const token = localStorage.getItem(Constants.accessTokenKey);
        if (!token) {
            return next.handle(req).pipe(
                finalize(() => loaderRef.complete())
            );
        }

        if (token && !this._appUtils.isUserAuthenticated()) {
            return this.refreshAndRetry(req, next, loaderRef);
        }

        // Token valid — attach and send
        return next.handle(this.addToken(req, token)).pipe(
            finalize(() => loaderRef.complete()),
            catchError(error => {
                // Safety net for server-side revocation / clock skew
                if (error.status === 401) {
                    return this.refreshAndRetry(req, next, loaderRef);
                }
                return throwError(() => error);
            })
        );
    }

    private refreshAndRetry(
        request: HttpRequest<any>,
        next: HttpHandler,
        loaderRef = this._loadingBarService.useRef()
    ): Observable<HttpEvent<any>> {

        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null); // block queue

            return this.authService.refreshAccessToken().pipe(
                switchMap(tokens => {
                    this.isRefreshing = false;
                    localStorage.setItem(Constants.accessTokenKey, tokens.accessToken);
                    this.refreshTokenSubject.next(tokens.accessToken); // unblock queue
                    this._appUtils.setAuthenticatedSubject(true);
                    return next.handle(this.addToken(request, tokens.accessToken));
                }),
                catchError(err => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(null);
                    this._appUtils.setAuthenticatedSubject(false);

                    localStorage.clear();
                    this.router.navigate(['/auth/login']);
                    return throwError(() => err);
                }),
                finalize(() => loaderRef.complete())
            );

        } else {
            // Queue — wait for refresh to complete
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addToken(request, token!));
                }),
                finalize(() => loaderRef.complete())
            );
        }
    }

    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    private _isAuthEndpoint(req: HttpRequest<any>): boolean {
        return req.url.includes('auth/login')
            || req.url.includes('auth/refresh')
            || req.url.includes('auth/hard-reset')
            || req.url.includes('auth/register');
    }
}