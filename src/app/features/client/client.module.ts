import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientService } from "./services/client.service";
import { ClientComponent } from "./components/client/client.component";
import { ClientOverviewComponent } from "./components/client/overview/client-overview.component";
import { ClientSummaryComponent } from "./components/client/summary/client-summary.component";
import { InvoiceListComponent } from "./components/client/invoice-list/invoice-list.component";
import { InvoiceService } from "./services/invoice.service";
import { ClientStateService } from "./services/client-state.service";
import { CreateInvoiceComponent } from "./components/client/create-invoice/create-invoice.component";
import { CreateInvoiceItemComponent } from "./components/client/create-invoice/create-invoice-item/create-invoice-item.component";
import { InvoiceItemDetailComponent } from "./components/client/create-invoice/invoice-item-detail/invoice-item-detail.component";
import { InvoiceSummaryComponent } from "./components/client/create-invoice/invoice-summary/invoice-summary.component";
import { InvoiceDetailComponent } from "./components/client/create-invoice/invoice-detail/invoice-detail.component";


@NgModule({
    declarations: [
        ClientListComponent,
        ClientComponent,
        ClientOverviewComponent,
        ClientSummaryComponent,
        InvoiceListComponent,
        CreateInvoiceComponent,
        CreateInvoiceItemComponent,
        InvoiceItemDetailComponent,
        InvoiceSummaryComponent,
        InvoiceDetailComponent
    ],
    imports: [
        SharedModule,
        ClientRoutingModule,
    ],
    exports: [],
    providers: [
        ClientService,
        InvoiceService,
        ClientStateService]
})
export class ClientModule {

}