import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { catchError, of, tap } from "rxjs";
import { AppUtils } from "src/app/helpers/app.utils";
import { Constants, DialogSizeOptions } from "src/app/helpers/constants";
import { greaterThanZeroValidator, gstinValidator } from "src/app/helpers/validators";
import { IStateDto, SharedAppStateService } from "src/app/shared/services/shared-app-state.service";
import { SignUpFormKey } from "../../entities/entities";
import { AuthService, ISignUpDto } from "../../services/auth.service";
import { SignUpDialogComponent } from "../dialog/sign-up/sign-up-dialog.component";

@Component({
    selector: 'ngx-sign-up',
    standalone: false,
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
    protected signUpForm!: FormGroup;
    protected readonly FormKey = SignUpFormKey;
    protected states: IStateDto[] = [];

    constructor(private readonly _fb: FormBuilder,
        private readonly _appUtils: AppUtils,
        private readonly _authService: AuthService,
        private readonly _toastr: ToastrService,
        private readonly _router: Router,
        private readonly _appStateService: SharedAppStateService,
        private readonly _dialog: MatDialog
    ) {
        _appStateService.getStates().subscribe(states => {
            this.states = states;
        })
    }

    public ngOnInit(): void {
        this._ifUserAuthenticated();
        this._initForm();
    }

    protected onSubmit(): void {
        if (this.signUpForm.invalid) {
            this.signUpForm.markAllAsTouched();
            this._toastr.error('Please fill in all required fields correctly.');
            return;
        }

        const loginData = this._getFormValue();
        this._authService.signupUser(loginData).pipe(
            tap(data => {
                this._dialog.open(SignUpDialogComponent, {
                    width: DialogSizeOptions.large
                });
            }), catchError(err => {
                this._appUtils.showErrors(err.error);
                return of();
            })).subscribe();
    }

    private _getFormValue(): ISignUpDto {
        const value = this.signUpForm.value;
        return {
            email: value[SignUpFormKey.EMAIL],
            password: value[SignUpFormKey.PASSWORD],
            businessName: value[SignUpFormKey.BUSINESSNAME],
            gstin: value[SignUpFormKey.GSTIN],
            address: value[SignUpFormKey.ADDRESS],
            stateId: value[SignUpFormKey.STATE]
        }
    }

    private _initForm(): void {
        this.signUpForm = this._fb.group({
            [SignUpFormKey.EMAIL]: ['', [Validators.required, Validators.email]],
            [SignUpFormKey.REENTERPASSWORD]: ['', [Validators.required,]],
            [SignUpFormKey.PASSWORD]: ['', [Validators.required, Validators.minLength(6), Validators.pattern(Constants.passwordRegex)]],
            [SignUpFormKey.BUSINESSNAME]: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            [SignUpFormKey.GSTIN]: ['', [Validators.required, gstinValidator()]],
            [SignUpFormKey.ADDRESS]: ['', [Validators.required, Validators.minLength(5)]],
            [SignUpFormKey.STATE]: [null, [Validators.required, greaterThanZeroValidator()]]
        },
            {
                validators: [this._matchPasswordValidator()]
            }
        );
    }

    private _matchPasswordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            // Cast control to an AbstractControl since this will be applied to the group level
            const password = control.get(this.FormKey.PASSWORD)?.value;
            const confirmPassword = control.get(this.FormKey.REENTERPASSWORD)?.value;

            const confirmPasswordControl = control.get(this.FormKey.REENTERPASSWORD);

            // If either field is empty, let 'required' validator handle it instead
            if (!password || !confirmPassword) {
                return null;
            }

            if (password !== confirmPassword) {
                // Set the error on the specific field so the UI marks it red automatically
                confirmPasswordControl?.setErrors({ passwordMismatch: true });
                return { passwordMismatch: true };
            } else {
                // Clean up the error block if they now match, but preserve other potential validation errors
                if (confirmPasswordControl?.hasError('passwordMismatch')) {
                    const currentErrors = confirmPasswordControl.errors;
                    if (currentErrors) {
                        delete currentErrors['passwordMismatch'];
                        confirmPasswordControl.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
                    }
                }
                return null;
            }
        };
    }

    private _ifUserAuthenticated(): void {
        if (this._appUtils.isUserAuthenticated()) {
            this._router.navigate(['/dashboard/home']);
        }
    }

}