import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Constants } from 'src/app/helpers/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null>(null);

    constructor(
        private authService: AuthService,
        private router: Router,
        private readonly _loadingBarService: LoadingBarService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem(Constants.accessTokenKey);
        const loaderRef = this._loadingBarService.useRef();
        let authReq = req;

        if (token) {
            authReq = this.addToken(req, token);
        }
        loaderRef.start();

        return next.handle(authReq).pipe(tap(() => {
            loaderRef.complete();
        }),
            catchError(error => {
                loaderRef.complete();
                if (error.status === 401 && !req.url.includes('/refresh-token')) {
                    return this.handle401Error(authReq, next);
                }

                return throwError(() => error);
            })
        );
    }

    private handle401Error(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        if (!this.isRefreshing) {

            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshAccessToken().pipe(

                switchMap((tokens) => {

                    this.isRefreshing = false;

                    localStorage.setItem(Constants.accessTokenKey, tokens.accessToken);
                    localStorage.setItem(Constants.refreshTokenKey, tokens.refreshToken);

                    this.refreshTokenSubject.next(tokens.accessToken);

                    return next.handle(
                        this.addToken(request.clone({ withCredentials: true }), tokens.accessToken)
                    );

                }),

                catchError(err => {

                    this.isRefreshing = false;

                    localStorage.clear();
                    this.router.navigate(['/login']);

                    return throwError(() => err);
                })
            );
        }

        // Wait until refresh finishes
        return this.refreshTokenSubject.pipe(

            filter(token => token != null),

            take(1),

            switchMap(token => {
                return next.handle(
                    this.addToken(request, token!)
                );
            })

        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}