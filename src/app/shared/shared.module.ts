import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LayoutComponent } from "./components";
import { CardComponent } from "./components/card/card.component";
import { DashboardItemComponent } from "./components/dashboard-item/dashboard-item.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ResourceNotFoundComponent } from './components/resource-not-found/resource-not-found.component';
import { LoadingObserverService } from "./services/loading-observer.service";
import { provideNativeDateAdapter } from "@angular/material/core";
@NgModule({
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatChipsModule,
        LoadingBarModule,
        MatPaginatorModule,
        FormsModule,
        MatSortModule,
        MatDatepickerModule
    ],
    declarations: [
        LayoutComponent,
        ResourceNotFoundComponent,
        NavbarComponent,
        CardComponent,
        DashboardItemComponent
    ],
    exports: [
        LayoutComponent,
        ResourceNotFoundComponent,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatSelectModule,
        MatDialogModule,
        CardComponent,
        DashboardItemComponent,
        MatTableModule,
        MatChipsModule,
        LoadingBarModule,
        MatPaginatorModule,
        FormsModule,
        MatSortModule,
        MatDatepickerModule
    ],
    providers:[LoadingObserverService,provideNativeDateAdapter()]
})
export class SharedModule {

}