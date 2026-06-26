import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AppUtils } from "src/app/helpers/app.utils";

export const authGuard : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const appUtils = inject(AppUtils);
    const router = inject(Router);

    if(appUtils.isUserAuthenticated()){
        return true;
    }
    router.navigate(['auth/login']);
    return false;
}