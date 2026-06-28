import { NgModule } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardService } from "./services/dashboard.service";
import { RecentInvoiceComponent } from "./components/recent-invoice/recent-invoice.component";
import { RecentClientComponent } from "./components/recent-client/recent-client.component";
import { OverallMonthlySummaryComponent } from "./components/overall-monthly-summary/ovarall-monthly-summary.component";

@NgModule({
    declarations: [
        DashboardComponent,
        RecentInvoiceComponent,
        RecentClientComponent,
        OverallMonthlySummaryComponent
    ],
    imports: [DashboardRoutingModule, SharedModule],
    providers: [DashboardService]
})
export class DashboardModule {

}