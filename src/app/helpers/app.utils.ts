import { inject, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from "ngx-toastr";
import { AppDate } from "./app.date";
import { Constants } from "./constants";

@Injectable({
    providedIn: 'root'
})
export class AppUtils {
    private readonly _snackbar = inject(MatSnackBar);
    constructor(private readonly _toastr: ToastrService) { }
    public isUserAuthenticated(): boolean {
        var tokenItem = this._getToken();
        if (this.isNullOrEmpty(tokenItem)) return false;
        else {
            var decodedToken: any = this.getDecodedToken();
            if (AppDate.unixToDate(decodedToken.exp) < AppDate.getCurrentDate())
                return true;
            else return false;
        }
    }

    public isNullOrEmpty(value: string): boolean {
        if (value === null || value === '' || value === undefined) return true;
        else return false;
    }

    public getDecodedToken(): string {
        this.CheckTokenExists();
        const token = this._getToken();
        return jwtDecode(token);
    }

    public CheckTokenExists(): boolean {
        var tokenItem = this._getToken();
        if (this.isNullOrEmpty(tokenItem)) {
            this.ShowSnackbar("Unothorized user");
            return false;
        }
        return true;
    }

    public ShowSnackbar(message: string, action: string = Constants.snackbarDefault.actionString): void {
        this._snackbar.open(message, action, {
            horizontalPosition: Constants.snackbarDefault.positionRight as MatSnackBarHorizontalPosition,
            verticalPosition: Constants.snackbarDefault.positionTop as MatSnackBarVerticalPosition
        });
    }

    public showErrors(errors: IErrorResponse[]): void {
        errors.forEach(error => {
            this._toastr.error(error.message);
        });
    }

    private _getToken(): string {
        return localStorage.getItem(Constants.accessTokenKey) ?? '';
    }

    public getAccessTokenExpiry(): Date {
        const decodedToken: any = this.getDecodedToken();
        return AppDate.unixToDate(decodedToken.exp);
    }
}

interface IErrorResponse {
    message: string;
}