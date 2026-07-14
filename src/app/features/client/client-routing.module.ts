import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { ClientComponent } from "./components/client/client.component";

const routes:Routes = [
    {
        path:'',
        redirectTo:'list',
        pathMatch:'full'
    },
    {
        path:'list',
        component:ClientListComponent
    },
    {
        path:':id',
        component:ClientComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ClientRoutingModule{

}