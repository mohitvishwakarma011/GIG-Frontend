import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Helpers } from "src/app/helpers/helpers";
import { environment } from "src/environments/environment";

@Injectable()
export class DashboardService {
    private readonly apiUrl = `${environment.apiUrl}/dashboard`;
    constructor(private readonly http: HttpClient) { }

    public getDashboardSummary(): Observable<IDashboardSummaryDto> {
        return this.http.get<IDashboardSummary>(`${this.apiUrl}/items`)
            .pipe(map(data => {
                return {
                    dashboardItems: data.dashboardItems.map(x => toDashboardItem(x)),
                    overallMonthSummary: toOverallSummary(data.overallMonthSummary)
                };
            }))
    }

    public getRecentInvoiceItems(): Observable<IRecentInvoiceItemDto[]> {
        return this.http.get<IRecentInvoiceItem[]>(`${this.apiUrl}/recent-invoices`)
            .pipe(map(data => {
                return data.map(x => toRecentInvoiceItem(x));
            }));
    }

    public getRecentClients(): Observable<IRecentClientsDto[]> {
        return this.http.get<IRecentClients[]>(`${this.apiUrl}/recent-clients`)
            .pipe(map(data => {
                return data.map(x => toRecentClients(x));
            }));
    }
}

const toDashboardItem = (data: IDashboardItem): IDashboardItemDto => {
    return { ...data };
}

const toRecentInvoiceItem = (data: IRecentInvoiceItem): IRecentInvoiceItemDto => {
    return { ...data, status: Helpers.getStatusString(data.status) };
}

const toRecentClients = (data: IRecentClients): IRecentClientsDto => {
    return { ...data };
}

const toOverallSummary = (data: IOverallMonthSummary): IOverallMonthSummaryDto => {
    return { ...data };
}

interface IDashboardSummary {
    dashboardItems: IDashboardItem[];
    overallMonthSummary: IOverallMonthSummary;
}

interface IDashboardItem {
    type: string;
    count: number;
    description: string;
}

interface IOverallMonthSummary {
    invoiceRaised: number;
    amountBilled: number;
    amountReceived: number;
    gstCollected: number;
    activeClients: number;
}

export interface IDashboardSummaryDto extends IDashboardSummary { }
export interface IDashboardItemDto extends IDashboardItem {
}
export interface IOverallMonthSummaryDto extends IOverallMonthSummary {
}

interface IRecentInvoiceItemBase {
    id: number;
    invoiceNumber: string;
    clientName: string;
    amount: number;
    dueDate: Date;
}


interface IRecentInvoiceItem extends IRecentInvoiceItemBase {
    status: number;
}

export interface IRecentInvoiceItemDto extends IRecentInvoiceItemBase {
    status: string;
}

interface IRecentClients {
    name: string;
    gstin: string;
    state: string;
    id: number;
}

export interface IRecentClientsDto extends IRecentClients { }