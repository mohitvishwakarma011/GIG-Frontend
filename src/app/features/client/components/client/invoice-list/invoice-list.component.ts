import { Component, inject, Input, OnInit, signal } from "@angular/core";
import { ClientService, IInvoiceListDto } from "../../../services/client.service";
import { AppUtils } from "src/app/helpers/app.utils";
import { catchError, of, tap } from "rxjs";
import { Constants } from "src/app/helpers/constants";

@Component({
    selector: 'ngx-invoice-list',
    standalone: false,
    templateUrl: './invoice-list.component.html',
    styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent implements OnInit {
    @Input() clientId: number = 0;
    @Input() clientName: string = '';

    private readonly _clientService = inject(ClientService);
    private readonly _appUtils = inject(AppUtils);

    protected invoices = signal<IInvoiceListDto[]>(null);
    protected isModelLoaded = signal(false);

    protected readonly invoiceStatus = Constants.invoiceStatus;
    protected displayedColumns: string[] = ['#', 'date', 'duedate', 'amount', 'status', 'action'];

    public ngOnInit(): void {
        this._getClientInvices();
    }

    private _getClientInvices(): void {
        this._clientService.getClientInvoices(this.clientId)
            .pipe(tap(data => {
                this.invoices.set(data);
                this.isModelLoaded.set(true);
            }),
                catchError(err => {
                    this._appUtils.showErrors(err.error);
                    this.isModelLoaded.set(true);
                    return of();
                })).subscribe();
    }
}