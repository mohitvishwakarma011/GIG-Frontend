import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, of, tap } from 'rxjs';
import { AppUtils } from 'src/app/helpers/app.utils';
import { Constants } from 'src/app/helpers/constants';
import { IGroupedInvoiceItemDto, IInvoiceListDto, InvoicesService } from '../../services/invoices.service';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'ngx-invoice-list',
    templateUrl: './invoice-list.component.html',
    styleUrls: ['./invoice-list.component.scss'],
    standalone: false
})
export class InvoiceListComponent implements OnInit {
    private readonly _dialog = inject(MatDialog);
    private readonly _invoicesService = inject(InvoicesService);
    private readonly _appUtils = inject(AppUtils);
    private readonly _toastr = inject(ToastrService)

    protected invoices = signal<IGroupedInvoiceItemDto[]>(null);
    protected isModelLoaded = signal(false);
    protected displayedColumns = ['invoiceNumber', 'clientName', 'createdOn', 'dueDate', 'amount', 'status', 'action'];
    protected readonly invoiceStatus = Constants.invoiceStatus;
    protected totalInvoices = signal(0);

    public ngOnInit(): void {
        this._getInvoices();
    }

    protected openInvoiceDetails(invoiceId: number): void {
        this._dialog.open(InvoiceDetailsComponent, {
            width: '90vw',
            maxHeight: '90vh',
            data: { invoiceId: invoiceId }
        });
    }

    protected downloadInvoice(invoiceId: number): void {
        this._invoicesService.downloadInvoice(invoiceId)
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
        this._invoicesService.deleteInvoice(invoiceId)
            .pipe(tap(() => {
                this._toastr.success('Invoice deleted successfully')
                this._getInvoices();
            }),
                catchError(err => {
                    this._appUtils.showErrors(err.error);
                    return of();
                })).subscribe();
    }

    private _getInvoices(): void {
        this._invoicesService.getInvoices()
            .pipe(
                tap(data => {
                    this.invoices.set(data);
                    let totalinvoices = 0;
                    this.invoices().forEach(x => totalinvoices += x.totalInvoices)
                    this.totalInvoices.set(totalinvoices);
                    this.isModelLoaded.set(true);

                }),
                catchError(err => {
                    this._appUtils.showErrors(err?.error);
                    this.isModelLoaded.set(true);
                    return of([]);
                })
            ).subscribe();
    }
}
