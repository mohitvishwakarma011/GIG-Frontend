import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LayoutComponent } from "./components";
import { ResourceNotFoundComponent } from './components/resource-not-found/resource-not-found.component';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        LayoutComponent,
        ResourceNotFoundComponent
    ],
    exports: [
        LayoutComponent,
        ResourceNotFoundComponent,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {

}