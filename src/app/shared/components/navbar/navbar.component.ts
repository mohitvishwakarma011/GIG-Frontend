import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, of, Subscription, tap } from "rxjs";
import { AuthService } from "src/app/features/auth/services/auth.service";
import { AppUtils } from "src/app/helpers/app.utils";

@Component({
    selector: 'ngx-navbar',
    standalone: false,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnDestroy {
    protected isLoggedIn = false;
    private authenticatedSubscription: Subscription;
    constructor(private readonly router: Router,
        protected readonly appUtils: AppUtils,
        private readonly cdr: ChangeDetectorRef,
        private readonly authService: AuthService
    ) {
        this.authenticatedSubscription = this.appUtils.isAuthenticatedSubject().subscribe(data => {
            this.isLoggedIn = data;
            this.cdr.markForCheck();
        })
    }

    protected onLogout(): void {
        this.authService.logoutUser().pipe(catchError(err => {
            this.appUtils.showErrors(err.error);
            return of();
        })).subscribe();
        this.appUtils.setAuthenticatedSubject(false);
        localStorage.clear();
        this.router.navigate(['/auth/login']);
    }

    public ngOnDestroy(): void {
        this.authenticatedSubscription.unsubscribe();
    }
}