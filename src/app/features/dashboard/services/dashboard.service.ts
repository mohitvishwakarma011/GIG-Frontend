import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class DashboardService {
    private readonly apiUrl = `${environment.apiUrl}/dashboard`;
    constructor(private readonly http: HttpClient) { }

    public getDashboardSummary(): Observable<IDashboardItemDto[]> {
        return this.http.get<IDashboardItem[]>(`${this.apiUrl}/items`)
            .pipe(tap(data => {
                data.map(x => toDashboardItem(x));
            }))
    }
}

const toDashboardItem = (data: IDashboardItem): IDashboardItemDto => {
    return { ...data };
}

interface IDashboardItem {
    type: string;
    count: number;
    description: string;
}

export interface IDashboardItemDto extends IDashboardItem {
}