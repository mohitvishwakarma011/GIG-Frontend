import { Component, Input } from "@angular/core";
import { IOverallMonthSummaryDto } from "../../services/dashboard.service";


@Component({
    selector: 'ngx-overall-summary',
    standalone: false,
    templateUrl: './ovarall-monthly-summary.component.html',
    styleUrl: './ovarall-monthly-summary.component.scss'
})
export class OverallMonthlySummaryComponent {
    @Input() data: IOverallMonthSummaryDto = null;
}