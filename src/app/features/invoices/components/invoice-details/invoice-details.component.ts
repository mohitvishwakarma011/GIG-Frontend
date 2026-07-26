import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoicesService } from '../../services/invoices.service';
import { catchError, of, tap } from 'rxjs';
import { AppUtils } from 'src/app/helpers/app.utils';

@Component({
    selector: 'ngx-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.scss'],
    standalone:false
})
export class InvoiceDetailsComponent {
    private readonly _dialogRef = inject(MatDialogRef<InvoiceDetailsComponent>);
    private readonly _invoiceService = inject(InvoicesService);
    private readonly _appUtils = inject(AppUtils);
    private readonly data = inject(MAT_DIALOG_DATA) as { invoiceId: number };

    // protected invoice: IInvoiceDetailsDto | null = null;
    protected isModelLoaded = signal(false);

    constructor() {
        this._loadInvoice();
    }

    protected close(): void {
        this._dialogRef.close();
    }

    private _loadInvoice(): void {
        // this._invoiceService.getInvoiceById(this.data.invoiceId)
        //     .pipe(
        //         tap(result => {
        //             this.invoice = result ?? null;
        //             this.isModelLoaded.set(true);
        //         }),
        //         catchError(err => {
        //             this._appUtils.showErrors(err?.error);
        //             this.isModelLoaded.set(true);
        //             return of(null);
        //         })
        //     ).subscribe();
    }
}
