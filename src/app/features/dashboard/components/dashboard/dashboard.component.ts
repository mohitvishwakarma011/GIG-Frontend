import { Component, inject, OnInit, signal, Signal } from "@angular/core";
import { DashboardService, IDashboardItemDto } from "../../services/dashboard.service";
import { catchError, of, tap } from "rxjs";
import { AppUtils } from "src/app/helpers/app.utils";

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: false
})
export class DashboardComponent implements OnInit {
    private readonly _dashboardService = inject(DashboardService);
    private readonly _appUtils = inject(AppUtils);

    protected dashboardItems = signal<IDashboardItemDto[]>(null);

    public ngOnInit(): void {
        this._getDashboardData();
    }

    private _getDashboardData(): void {
        this._dashboardService.getDashboardSummary()
            .pipe(tap(data => {
                this.dashboardItems.set(data);
            }),
                catchError(err => {
                    this._appUtils.showErrors(err.error);
                    return of();
                })).subscribe();
    }
}