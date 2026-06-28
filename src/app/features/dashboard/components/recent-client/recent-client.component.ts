import { Component, inject, OnInit, signal } from "@angular/core";
import { DashboardService, IRecentClientsDto } from "../../services/dashboard.service";
import { HttpClient } from "@angular/common/http";
import { catchError, of, tap } from "rxjs";
import { AppUtils } from "src/app/helpers/app.utils";

@Component({
    selector:'ngx-recent-client',
    standalone:false,
    templateUrl:'./recent-client.component.html',
    styleUrl:'./recent-client.component.scss'
})
export class RecentClientComponent implements OnInit{
    private readonly _dashboardService = inject(DashboardService);
    private readonly _appUtils = inject(AppUtils);

    protected clients = signal<IRecentClientsDto[]>(null);
    public ngOnInit(): void {
        this._getRecentClients();
    }

    private _getRecentClients():void{
        this._dashboardService.getRecentClients()
            .pipe(tap(data =>{
                this.clients.set(data);
            }),catchError(err =>{
                this._appUtils.showErrors(err.error);
                return of();
            })).subscribe();
    }
}