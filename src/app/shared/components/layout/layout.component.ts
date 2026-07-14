import { Component, inject, ViewEncapsulation } from "@angular/core";
import { AppUtils } from "src/app/helpers/app.utils";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { filter, map, Observable, startWith } from "rxjs";
import { LoadingObserverService } from "../../services/loading-observer.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'ngx-layout',
    templateUrl: './layout.component.html',
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {
    protected isAuthenticated: boolean = false;
    private readonly _appUtils: AppUtils = inject(AppUtils);
    protected isAuthPage = false;

    isLoading$: Observable<boolean>;

    constructor(private loadingBar: LoadingBarService,
        private loaderObserverService: LoadingObserverService,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute) {
        this.isAuthenticated = this._appUtils.isUserAuthenticated();
        _router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntilDestroyed()
        )
            .subscribe((event) => {
                const nav = event as NavigationEnd;
                if (nav.url.includes("auth")) {
                    this.isAuthPage = true;
                } else {
                    this.isAuthPage = false;
                }
                console.log(this.isAuthPage);
            });

        this.isLoading$ = this.loadingBar.value$.pipe(map(value => value > 0 && value < 100), startWith(false));

        this.isLoading$.subscribe({
            next: value => {
                this.loaderObserverService.setState(value);
            }
        })

    }
}