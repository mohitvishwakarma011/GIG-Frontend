import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable()
export class InvoiceService {
    private readonly apiUrl = `${environment.apiUrl}/invoice`;
    private readonly _http = inject(HttpClient);

    public downloadInvoice(invoiceId: number): Observable<Blob> {
        return this._http.post(`${this.apiUrl}/pdf`, { invoiceId }, { responseType: 'blob' });
    }

    public deleteInvoice(invoiceId: number): Observable<void> {
        return this._http.delete<void>(`${this.apiUrl}/${invoiceId}`);
    }
}