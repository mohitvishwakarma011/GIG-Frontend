import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { catchError, of, tap } from "rxjs";
import { AuthService } from "src/app/features/auth/services/auth.service";
import { AppUtils } from "src/app/helpers/app.utils";
import { Constants } from "src/app/helpers/constants";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const appUtils = inject(AppUtils);
    const router = inject(Router);
    const toastr = inject(ToastrService);
    const authService = inject(AuthService);

    if (appUtils.CheckTokenExists()) {
        const token = localStorage.getItem(Constants.accessTokenKey) ?? '';
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(authReq).pipe(catchError(res => {
            if (res.status === 401) {
                const refreshToken = localStorage.getItem(Constants.refreshTokenKey);
                if ((!refreshToken) || appUtils.isNullOrEmpty(refreshToken)) {
                    toastr.error("Session expired. Please login again.");
                    router.navigate(['/login']);
                } else {
                    // Attempt to refresh the token
                    authService.refreshToken()
                        .pipe(tap(data => {
                            {
                                localStorage.setItem(Constants.accessTokenKey, res.accessToken);
                                localStorage.setItem(Constants.refreshTokenKey, res.refreshToken);
                                localStorage.setItem(Constants.refreshTokenExpiry, res.refreshTokenExpiry.toString());
                            }
                        }),
                            catchError(err => {
                                appUtils.showErrors(err.error);
                                router.navigate(['/login']);
                                return of(null);
                            })).subscribe();
                }
            }
            return of(res);
        }));
    }
    return next(req);
}