import { NgModule } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardService } from "./services/dashboard.service";
import { RecentInvoiceComponent } from "./components/recent-invoice/recent-invoice.component";

@NgModule({
    declarations:[DashboardComponent,RecentInvoiceComponent],
    imports: [DashboardRoutingModule, SharedModule],
    providers:[DashboardService]
})
export class DashboardModule{
    
}