import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { AppUtils } from 'src/app/helpers/app.utils';
import { Constants } from 'src/app/helpers/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    // Dependencies are cleanly injected through the constructor
    constructor(
        private readonly _appUtils: AppUtils,
        private readonly _router: Router,
        private readonly _toastr: ToastrService,
        private readonly _authService: AuthService,
        private readonly _loadingBarService: LoadingBarService
    ) {

    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const loaderRef = this._loadingBarService.useRef();

        if (!req.url.includes("account/health-check")) {
            loaderRef.start();
        }

        if (this._appUtils.CheckTokenExists()) {
            const token = localStorage.getItem(Constants.accessTokenKey) ?? '';

            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });

            return next.handle(authReq).pipe(
                catchError(res => {
                    if (res.status === 401) {
                        const refreshToken = localStorage.getItem(Constants.refreshTokenKey);

                        if (!refreshToken || this._appUtils.isNullOrEmpty(refreshToken)) {
                            this._toastr.error("Session expired. Please login again.");
                            localStorage.clear();
                            this._router.navigate(['auth/login']);
                        } else {
                            // Attempt to refresh the token
                            this._authService.refreshAccessToken().pipe(
                                tap(data => {
                                    // Note: In your original snippet, 'res' was used here by mistake instead of 'data'
                                    localStorage.setItem(Constants.accessTokenKey, data.accessToken);
                                    localStorage.setItem(Constants.refreshTokenKey, data.refreshToken);
                                    localStorage.setItem(Constants.refreshTokenExpiry, data.refreshTokenExpiry.toString());
                                }),
                                catchError(err => {
                                    this._appUtils.showErrors(err.error);
                                    localStorage.clear();
                                    this._router.navigate(['/login']);
                                    return of(null);
                                })
                            ).subscribe();
                        }
                    }
                    return of(res);
                }),
                finalize(() => {
                    if (!req.url.includes("account/health-check")) {
                        loaderRef.complete();
                    }
                })
            );
        }

        return next.handle(req).pipe(finalize(() => {
            if (!req.url.includes("account/health-check")) {
                loaderRef.complete();
            }
        }));
    }
}