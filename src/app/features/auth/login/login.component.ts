import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUtils } from 'src/app/helpers/app.utils';
import { FormKey } from '../entities/entities';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected loginForm!: FormGroup;

  private readonly _appUtils = Inject(AppUtils);
  private readonly fb: FormBuilder = Inject(FormBuilder);
  private readonly LoginFormKey = FormKey;
  constructor() { }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      [FormKey.EMAIL]: ['', [Validators.required, Validators.email]],
      [FormKey.PASSWORD]: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      
      return;
    }
    console.log(this.loginForm);
    const { email, password } = this.loginForm.value;
    // console.log('Reactive Form Login:', email, password);
  }
}
