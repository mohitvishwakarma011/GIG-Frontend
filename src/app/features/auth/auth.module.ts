import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { SignUpDialogComponent } from "./components/dialog/sign-up/sign-up-dialog.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";

@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
        SignUpDialogComponent
    ],
    imports: [
        AuthRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: []
})
export class AuthModule { }