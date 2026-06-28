import { Component, inject, OnInit, signal } from "@angular/core";
import { catchError, of, tap } from "rxjs";
import { AppUtils } from "src/app/helpers/app.utils";
import { Constants } from "src/app/helpers/constants";
import { DashboardService, IRecentInvoiceItemDto } from "../../services/dashboard.service";

@Component({
    selector: 'ngx-recent-invoice',
    standalone: false,
    templateUrl: './recent-invoice.component.html',
    styleUrls: ['./recent-invoice.component.scss']
})
export class RecentInvoiceComponent implements OnInit {
    private readonly _dashboardService = inject(DashboardService);
    private readonly _apputils = inject(AppUtils);
    protected readonly invoiceStatus = Constants.invoiceStatus;

    protected displayedColumns: string[] = ['#', 'client', 'amount', 'duedate','status','action'];

    protected tableData = signal<IRecentInvoiceItemDto[]>(null);
    public ngOnInit(): void {
        this._getRecentInvoiceItem();
    }

    private _getRecentInvoiceItem(): void {
        this._dashboardService.getRecentInvoiceItems()
            .pipe(tap(data => {
                this.tableData.set(data);
            }),
                catchError(err => {
                    this._apputils.showErrors(err.error);
                    return of();
                })).subscribe();
    }
}