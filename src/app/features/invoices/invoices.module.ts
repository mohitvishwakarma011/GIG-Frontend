import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceLineItemsComponent } from './components/invoice-line-items/invoice-line-items.component';
import { InvoicePaymentComponent } from './components/invoice-payment/invoice-payment.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesService } from './services/invoices.service';


@NgModule({
    declarations: [
        InvoiceListComponent,
        InvoiceDetailsComponent,
        InvoiceLineItemsComponent,
        InvoicePaymentComponent
    ],
    imports: [
        SharedModule,
        InvoicesRoutingModule
    ],
    providers: [InvoicesService]
})
export class InvoicesModule { }
