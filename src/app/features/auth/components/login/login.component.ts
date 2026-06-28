import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { AppUtils } from 'src/app/helpers/app.utils';
import { FormKey } from '../../entities/entities';
import { AuthService, ILoginDto, ILoginResponseDto } from '../../services/auth.service';
import { Constants } from 'src/app/helpers/constants';
import { Router } from '@angular/router';
import { AppDate } from 'src/app/helpers/app.date';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected loginForm!: FormGroup;

  protected readonly LoginFormKey = FormKey;
  constructor(private readonly _fb: FormBuilder,
    private readonly _appUtils: AppUtils,
    private readonly _authService: AuthService,
    private readonly _toastr: ToastrService,
    private readonly _router: Router
  ) { }

  public ngOnInit(): void {
    this._ifUserAuthenticated();
    this.loginForm = this._fb.group({
      [FormKey.EMAIL]: ['', [Validators.required, Validators.email]],
      [FormKey.PASSWORD]: ['', [Validators.required]]
    });
  }

  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this._toastr.error('Please fill in all required fields correctly.');
      return;
    }
    const loginData = this._getFormValue();
    this._authService.loginUser(loginData)
      .pipe(
        tap(data => {
          this._saveAuthResponse(data);
          this._router.navigate(['/dashboard/home']);
        }),
        catchError(err => {
          console.error('Login error:', err);
          this._appUtils.showErrors(err.error);
          return of(null);
        }))
      .subscribe();
  }

  private _getFormValue(): ILoginDto {
    const value = this.loginForm.value;
    return {
      email: value[FormKey.EMAIL],
      password: value[FormKey.PASSWORD]
    }
  }

  private _saveAuthResponse(res: ILoginResponseDto): void {
    //save AuthToken
    localStorage.setItem(Constants.accessTokenKey, res.accessToken);
    localStorage.setItem(Constants.refreshTokenKey, res.refreshToken);
    localStorage.setItem(Constants.refreshTokenExpiry, res.refreshTokenExpiry.toString());
    this._appUtils.setAuthenticatedSubject(true);
  }

  private _ifUserAuthenticated(): void {
    if (this._appUtils.isUserAuthenticated()) {
      this._router.navigate(['/dashboard/home']);
    } else {
      this._refreshAccessToken();
    }
  }

  private _refreshAccessToken(): void {
    if (!this._appUtils.getRefreshTokenExpiry() && this._appUtils.getRefreshTokenExpiry() < AppDate.getCurrentDate())
      return;

    this._authService.refreshAccessToken().pipe(tap(data => {
      this._saveAuthResponse(data);
      this._router.navigate(['/dashboard/home']);
    }),
      catchError(err => {
        this._toastr.error("Session has been expired. Please login!");
        return of();
      })).subscribe();
  }
}
