import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { AppDate } from "src/app/helpers/app.date";
import { AppUtils } from "src/app/helpers/app.utils";
import { Constants } from "src/app/helpers/constants";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly rootEndpoint = `${environment.apiUrl}/auth`;
    constructor(private readonly http: HttpClient,
        private readonly appUtils: AppUtils
    ) { }

    public loginUser(dto: ILoginDto): Observable<ILoginResponseDto> {
        return this.http.post<ILoginResponse>(`${this.rootEndpoint}/login`, dto)
            .pipe(map(data => {
                return toLoginResponseDto(data);
            }));
    }

    public refreshAccessToken(): Observable<ILoginResponseDto> {
        const refreshToken = localStorage.getItem(Constants.refreshTokenKey);
        return this.http.post<ILoginResponse>(`${this.rootEndpoint}/refresh`, { refreshToken })
            .pipe(map(data => {
                return toLoginResponseDto(data);
            }));
    }

    public signupUser(dto: ISignUpDto): Observable<number> {
        return this.http.post<number>(`${this.rootEndpoint}/register`, dto)
            .pipe(tap(data => {
                return data;
            }))
    }

    public logoutUser(): Observable<any> {
        const userId = this.appUtils.getUserIdentifier();
        return this.http.put(`${this.rootEndpoint}/logout`,{userId});
    }
}

const toLoginResponseDto = (response: ILoginResponse): ILoginResponseDto => {
    return {
        ...response,
        refreshTokenExpiry: AppDate.toDate(response.refreshTokenExpiry)
    }
}


//Log In
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
    email: string;
    password: string;
}

//Sign UP
export interface ISignUpDto {
    email: string;
    password: string;
    businessName: string;
    gstin: string;
    address: string;
    stateId: number;
}