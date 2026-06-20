import { Component, inject, ViewEncapsulation } from "@angular/core";
import { AppUtils } from "src/app/helpers/app.utils";
import { Router } from "@angular/router";

@Component({
    selector: 'ngx-layout',
    templateUrl: './layout.component.html',
    standalone: false,
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {
    protected isAuthenticated: boolean = false;
    private readonly _appUtils: AppUtils = inject(AppUtils);
    
    constructor(private readonly _router: Router) {
        this.isAuthenticated = this._appUtils.isUserAuthenticated();
        // if(!this.isAuthenticated){
        //     this._router.navigate(['/auth/login']);
        // }
    }
}