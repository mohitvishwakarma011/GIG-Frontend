import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientService } from "./services/client.service";
import { ClientComponent } from "./components/client/client.component";
import { ClientOverviewComponent } from "./components/client/overview/client-overview.component";
import { ClientSummaryComponent } from "./components/client/summary/client-summary.component";
import { InvoiceListComponent } from "./components/client/invoice-list/invoice-list.component";


@NgModule({
    declarations: [
        ClientListComponent,
        ClientComponent,
        ClientOverviewComponent,
        ClientSummaryComponent,
        InvoiceListComponent
    ],
    imports: [
        SharedModule,
        ClientRoutingModule,
    ],
    exports: [],
    providers: [ClientService]
})
export class ClientModule {

}