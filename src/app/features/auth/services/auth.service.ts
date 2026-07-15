import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
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
        return this.http.post<ILoginResponse>(`${this.rootEndpoint}/login`, dto, { withCredentials: true })
            .pipe(map(data => {
                return toLoginResponseDto(data);
            }));
    }

    public refreshAccessToken(): Observable<ILoginResponseDto> {
        return this.http.get<ILoginResponse>(`${this.rootEndpoint}/refresh`, { withCredentials: true })
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
        return this.http.put(`${this.rootEndpoint}/logout`, { userId });
    }
}

const toLoginResponseDto = (response: ILoginResponse): ILoginResponseDto => {
    return {
        ...response
    }
}

//Log In
interface ILoginResponseBase {
    accessToken: string;
    businessName: string;
    email: string;
}

interface ILoginResponse extends ILoginResponseBase {
}

export interface ILoginResponseDto extends ILoginResponseBase {
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