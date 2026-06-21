import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AppDate } from "src/app/helpers/app.date";
import { Constants } from "src/app/helpers/constants";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {
    private readonly rootEndpoint = `${environment.apiUrl}/auth`;
    constructor(private readonly http: HttpClient) { }

    public loginUser(dto: ILoginDto): Observable<ILoginResponseDto> {
        return this.http.post<ILoginResponse>(`${this.rootEndpoint}/login`, dto)
            .pipe(map(data => {
                return toLoginResponseDto(data);
            }));
    }

    public refreshToken(): Observable<ILoginResponseDto> {
        const refreshToken = localStorage.getItem(Constants.refreshTokenKey);
        return this.http.post<ILoginResponse>(`${this.rootEndpoint}/refresh`, { refreshToken })
            .pipe(map(data => {
                return toLoginResponseDto(data);
            }));
    }
}

const toLoginResponseDto = (response: ILoginResponse): ILoginResponseDto => {
    return {
        ...response,
        refreshTokenExpiry: AppDate.toDate(response.refreshTokenExpiry)
    }
}

interface ILoginResponseBase {
    accessToken: string;
    businessName: string;
    email: string;
    refreshToken: string;
}

interface ILoginResponse extends ILoginResponseBase {
    refreshTokenExpiry: string;
}

export interface ILoginResponseDto extends ILoginResponseBase {
    refreshTokenExpiry: Date;
}

export interface ILoginDto {
    Email: string;
    Password: string;
}