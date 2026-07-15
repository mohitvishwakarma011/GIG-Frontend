import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IClientDto } from "./client.service";

@Injectable()
export class ClientStateService{
    private clientBehavior =  new BehaviorSubject<IClientDto>(null);
    
    public setClientInfo(data:IClientDto):void{
        this.clientBehavior.next(data);
    }

    public getClientInfo():Observable<IClientDto>{
        return this.clientBehavior.asObservable();
    }
}