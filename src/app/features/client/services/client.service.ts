import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AppDate } from "src/app/helpers/app.date";
import { IBasePagination } from "src/app/shared/entities/entities";
import { environment } from "src/environments/environment";

@Injectable()
export class ClientService {
    private readonly apiUrl = `${environment.apiUrl}/client`;
    private readonly _http = inject(HttpClient);

    public getClients(query: IBasePagination): Observable<IClientDto[]> {
        return this._http.get<IClient[]>(`${this.apiUrl}${query.toQueryString()}`)
            .pipe(map(data => {
                return data.map(x => toClientDto(x));
            }));
    }
}

const toClientDto = (data: IClient): IClientDto => {
    return { ...data, createdOn: AppDate.toDate(data.createdOn) }
}

interface IClientBase {
    id: number;
    name: string;
    gstin: string | null;
    email: string;
    billingAddress: string;
    shippingAddress: string | null;
    state: string;
    stateCode: number;
}

interface IClient extends IClientBase {
    createdOn: string;
}

export interface IClientDto extends IClientBase {
    createdOn: Date;
}

