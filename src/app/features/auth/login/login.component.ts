import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { AppUtils } from 'src/app/helpers/app.utils';
import { FormKey } from '../entities/entities';
import { AuthService, ILoginDto, ILoginResponseDto } from '../services/auth.service';
import { Constants } from 'src/app/helpers/constants';

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
    private readonly _toastr: ToastrService
  ) { }

  public ngOnInit(): void {
    this.loginForm = this._fb.group({
      [FormKey.EMAIL]: ['', [Validators.required, Validators.email]],
      [FormKey.PASSWORD]: ['', [Validators.required, Validators.minLength(6)]]
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
      Email: value[FormKey.EMAIL],
      Password: value[FormKey.PASSWORD]
    }
  }

  private _saveAuthResponse(res:ILoginResponseDto):void{
    //save AuthToken
    localStorage.setItem(Constants.accessTokenKey,res.accessToken);
    localStorage.setItem(Constants.refreshTokenKey,res.refreshToken);
    localStorage.setItem(Constants.refreshTokenExpiry,res.refreshTokenExpiry.toString());
  }
}
