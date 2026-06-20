import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
    private readonly rootEndpoint = 'auth';

    constructor(private readonly http: HttpClient) { }

    public LoginUser(dto: ILoginDto): Observable<number> {
        return this.http.post<number>(`{this.rootEndpoint}/login`, dto);
    }
}

export interface ILoginDto {
    Email: string;
    Password: string;
}

