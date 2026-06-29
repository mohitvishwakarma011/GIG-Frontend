import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientService } from "./services/client.service";


@NgModule({
    declarations: [
        ClientListComponent
    ],
    imports: [
        SharedModule,
        ClientRoutingModule,
    ],
    exports: [],
    providers: [ClientService]
})
export class ClientModule {

}