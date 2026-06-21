import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./services/auth.service";


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        AuthRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: [AuthService]
})
export class AuthModule { }