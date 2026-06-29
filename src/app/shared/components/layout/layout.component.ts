import { Component, inject, ViewEncapsulation } from "@angular/core";
import { AppUtils } from "src/app/helpers/app.utils";
import { Router } from "@angular/router";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { map, Observable, startWith } from "rxjs";
import { LoadingObserverService } from "../../services/loading-observer.service";

@Component({
    selector: 'ngx-layout',
    templateUrl: './layout.component.html',
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {
    protected isAuthenticated: boolean = false;
    private readonly _appUtils: AppUtils = inject(AppUtils);

    isLoading$: Observable<boolean>;

    constructor(private loadingBar: LoadingBarService,
        private loaderObserverService: LoadingObserverService,
        private readonly _router: Router) {
        this.isAuthenticated = this._appUtils.isUserAuthenticated();

        this.isLoading$ = this.loadingBar.value$.pipe(map(value => value > 0 && value < 100), startWith(false));

        this.isLoading$.subscribe({
            next: value => {
                this.loaderObserverService.setState(value);
            }
        })

    }
}