import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { AuthService } from "./services/auth.service";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { SignUpDialogComponent } from "./components/dialog/sign-up/sign-up-dialog.component";

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
    providers: [AuthService]
})
export class AuthModule { }