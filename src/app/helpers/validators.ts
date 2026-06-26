import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Constants } from "./constants";

export const gstinValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const regex = Constants.gstinRegex;

        if (!control.value) {
            return null;
        }

        const gstin = control.value.toUpperCase().trim();

        return regex.test(gstin)
            ? null
            : { invalidGSTIN: true };
    };
}

export const greaterThanZeroValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value === null || value === undefined || value === '') {
            return null;
        }

        const numericValue = Number(value);
        return !isNaN(numericValue) && numericValue > 0
            ? null
            : { greaterThanZero: true };
    };
}

export const passwordValidator = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const regex = Constants.passwordRegex;

        if (!control.value) {
            return null;
        }

        const password = control.value;

        return regex.test(password)
            ? null
            : { invalidPassword: true };
    };
}