import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class SharedAppStateService {
    private appUrl = `${environment.apiUrl}`;
    private statesSubject = new BehaviorSubject<IStateDto[]>([]);

    constructor(private readonly http: HttpClient,
        private readonly toastr: ToastrService
    ) {
        this.fetchStates();
    }

    public getStates(): Observable<IStateDto[]> {
        return this.statesSubject.asObservable();
    }

    private fetchStates(): void {
        this.http.get<IStateDto[]>(`${this.appUrl}/states`)
            .pipe(tap(data => {
                this.statesSubject.next(data);
            }),
                catchError(err => {
                    this.toastr.error(err);
                    return of(null);
                })).subscribe();
    }
}

//State
export interface IStateDto {
    name: string;
    description: string;
    code: number;
}