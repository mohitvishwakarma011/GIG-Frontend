import { Component, inject, Input, OnInit, signal } from "@angular/core";
import { ClientService, IInvoiceListDto } from "../../../services/client.service";
import { AppUtils } from "src/app/helpers/app.utils";
import { catchError, of, tap } from "rxjs";
import { Constants } from "src/app/helpers/constants";
import { InvoiceService } from "../../../services/invoice.service";
import { ToastrService } from "ngx-toastr";
import { ClientStateService } from "../../../services/client-state.service";
import { MatDialog } from "@angular/material/dialog";
import { CreateInvoiceComponent } from "../create-invoice/create-invoice.component";

@Component({
    selector: 'ngx-invoice-list',
    standalone: false,
    templateUrl: './invoice-list.component.html',
    styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent implements OnInit {
    @Input() clientId: number = 0;

    protected clientName = '';

    private readonly _clientService = inject(ClientService);
    private readonly _invoiceService = inject(InvoiceService);
    private readonly _appUtils = inject(AppUtils);
    private readonly _toastrService = inject(ToastrService);
    private readonly _clientStateService = inject(ClientStateService);
    private readonly _dialog = inject(MatDialog);

    protected invoices = signal<IInvoiceListDto[]>(null);
    protected isModelLoaded = signal(false);

    protected readonly invoiceStatus = Constants.invoiceStatus;
    protected displayedColumns: string[] = ['#', 'date', 'duedate', 'amount', 'status', 'action'];

    public ngOnInit(): void {
        this._getClientInvices();
        this._clientStateService.getClientInfo().subscribe(client => {
            this.clientName = client?.name;
        })
    }

    protected downloadInvoice(invoiceId: number): void {
        this._invoiceService.downloadInvoice(invoiceId)
            .pipe(tap((data: Blob) => {
                const url = window.URL.createObjectURL(data);
                const a = document.createElement('a');
                a.href = url;
                a.download = `invoice-${invoiceId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }))
            .subscribe();
    }

    protected deleteInvoice(invoiceId: number): void {
        this._invoiceService.deleteInvoice(invoiceId)
            .pipe(tap(() => {
                this._toastrService.success('Invoice deleted successfully')
                this._getClientInvices();
            }),
                catchError(err => {
                    this._appUtils.showErrors(err.error);
                    return of();
                })).subscribe();
    }

    protected createNewInvoice(): void {
        this._dialog.open(CreateInvoiceComponent, {
            minWidth: '90vw',
            height:'90%',
            data: { clientId: this.clientId }
        });
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