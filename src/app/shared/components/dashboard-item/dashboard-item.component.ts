import { Component, Input, OnInit } from "@angular/core";
import { IDashboardItemDto } from "src/app/features/dashboard/services/dashboard.service";
import { Constants } from "src/app/helpers/constants";


@Component({
    selector:'ngx-dashboard-item',
    standalone:false,
    templateUrl:'./dashboard-item.component.html',
    styleUrl:'./dashboard-item.component.scss'
})
export class DashboardItemComponent {
    protected readonly constants = Constants;
    @Input() item:IDashboardItemDto = null;
}