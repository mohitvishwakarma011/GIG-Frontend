import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, of, tap } from 'rxjs';
import { AppUtils } from 'src/app/helpers/app.utils';
import { Constants } from 'src/app/helpers/constants';
import { IGroupedInvoiceItemDto, IInvoiceListDto, InvoicesService } from '../../services/invoices.service';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';

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

    protected invoices = signal<IGroupedInvoiceItemDto[]>(null);
    protected isModelLoaded = signal(false);
    protected displayedColumns = ['invoiceNumber', 'clientName', 'createdOn', 'dueDate', 'amount', 'status'];
    protected readonly invoiceStatus = Constants.invoiceStatus;
    protected totalInvoices = signal(0);

    public ngOnInit(): void {
        this._getInvoices();
    }

    protected openInvoiceDetails(invoice: IInvoiceListDto): void {
        this._dialog.open(InvoiceDetailsComponent, {
            width: '90vw',
            maxHeight: '90vh',
            data: { invoiceId: invoice.id }
        });
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
