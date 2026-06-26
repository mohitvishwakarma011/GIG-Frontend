import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
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
        private readonly cdr: ChangeDetectorRef
    ) {
        this.authenticatedSubscription = this.appUtils.isAuthenticatedSubject().subscribe(data => {
            this.isLoggedIn = data;
            this.cdr.markForCheck();
        })
    }
    protected onLogout(): void {
        localStorage.clear();
        this.appUtils.setAuthenticatedSubject(false);
        this.router.navigate(['/auth/login']);
    }

    public ngOnDestroy(): void {
        this.authenticatedSubscription.unsubscribe();
    }
}