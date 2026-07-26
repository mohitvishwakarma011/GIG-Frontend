import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppDate } from 'src/app/helpers/app.date';
import { Helpers } from 'src/app/helpers/helpers';
import { environment } from 'src/environments/environment';

@Injectable()
export class InvoicesService {
    private readonly apiUrl = `${environment.apiUrl}/invoice`;
    private readonly http = inject(HttpClient);

    public getInvoices(): Observable<IGroupedInvoiceItemDto[]> {
        return this.http.get<IGroupedInvoiceItemRaw[]>(`${this.apiUrl}/grouped-list`)
            .pipe(map(data =>
                data.map(gi => {
                    return {
                        ...gi,
                        invoiceList: gi.invoiceList.map(x => toInvoiceListDto(x))
                    }
                })
            ))
    }

}

const toInvoiceListDto = (data: IInvoiceListRaw): IInvoiceListDto => {
    return {
        ...data,
        createdOn: AppDate.toDate(data.createdOn),
        dueDate: AppDate.toDate(data.dueDate),
        status: Helpers.getStatusString(data.status)
    }
}

interface IInvoiceListBase {
    id: number;
    invoiceNumber: string;
    clientName: string;
    total: number;
}

interface IInvoiceListRaw extends IInvoiceListBase {
    createdOn: string;
    dueDate: string;
    status: number;
}

export interface IInvoiceListDto extends IInvoiceListBase {
    createdOn: Date;
    dueDate: Date;
    status: string;
}

//Grouped
interface IGroupedInvoiceItemBase {
    totalAmount: number;
    totalInvoices: number;
    clientName: string;
}

interface IGroupedInvoiceItemRaw extends IGroupedInvoiceItemBase {
    invoiceList: IInvoiceListRaw[];
}

export interface IGroupedInvoiceItemDto extends IGroupedInvoiceItemBase {
    invoiceList: IInvoiceListDto[];
}