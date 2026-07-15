import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { AppDate } from "src/app/helpers/app.date";
import { Helpers } from "src/app/helpers/helpers";
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

    public getClientById(id: number): Observable<IClientDto> {
        return this._http.get<IClient>(`${this.apiUrl}/${id}`)
            .pipe(map(data => {
                return toClientDto(data);
            }));
    }

    public getClientSummary(clientId: number): Observable<IClientSummaryDto> {
        return this._http.get<IClientSummary>(`${this.apiUrl}/summary/${clientId}`)
            .pipe(tap(data => {
                return toClientSummaryDto(data);
            }))
    }

    public getClientInvoices(clientId: number): Observable<IInvoiceListDto[]> {
        return this._http.get<IInvoiceList[]>(`${this.apiUrl}/invoices/${clientId}`)
            .pipe(map(data => {
                return data.map(x => toInvoiceListDto(x));
            }));
    }

   
}

const toClientDto = (data: IClient): IClientDto => {
    return { ...data, createdOn: AppDate.toDate(data.createdOn) }
}

const toClientSummaryDto = (data: IClientSummary): IClientSummaryDto => {
    return { ...data }
}

const toInvoiceListDto = (data: IInvoiceList): IInvoiceListDto => {
    return { ...data, status: Helpers.getStatusString(data.status) }
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

//Summary
interface IClientSummary {
    outstanding: number;
    amountPaid: number;
    totalBilled: number;
    totalInvoices: number;
}

export interface IClientSummaryDto extends IClientSummary {

}

//Invoice List

interface IInvoiceListBase {
    id: number;
    invoiceNumber: string;
    clientName: string;
    createdOn: string;
    dueDate: string;
    total: number;
}

interface IInvoiceList extends IInvoiceListBase {
    status: number;
}

export interface IInvoiceListDto extends IInvoiceListBase {
    status: string;
}