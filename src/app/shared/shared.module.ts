import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LayoutComponent } from "./components";
import { CardComponent } from "./components/card/card.component";
import { DashboardItemComponent } from "./components/dashboard-item/dashboard-item.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ResourceNotFoundComponent } from './components/resource-not-found/resource-not-found.component';
import { LoadingObserverService } from "./services/loading-observer.service";

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
        LoadingBarModule
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
        LoadingBarModule
    ],
    providers:[LoadingObserverService]
})
export class SharedModule {

}