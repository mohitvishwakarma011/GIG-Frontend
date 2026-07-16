import { Component, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IClientSelectOptionDto } from '../../../services/client.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceFormKey } from '../../entities/entities';

@Component({
  selector: 'ngx-create-invoice',
  standalone: false,
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss'
})
export class CreateInvoiceComponent {
  private readonly _dialogRef = inject(MatDialogRef<CreateInvoiceComponent>);

  protected invoiceFormGroup: FormGroup = null;
  protected readonly InvoiceFormKey = InvoiceFormKey;

  private readonly _fb = inject(FormBuilder);
  constructor() {
    this._initializeFormGroup();
  }

  private _initializeFormGroup(): void {
    this.invoiceFormGroup = this._fb.group({
      [InvoiceFormKey.ClientId]: [null, Validators.required],
      [InvoiceFormKey.DueDate]: [null, Validators.required],
      [InvoiceFormKey.Notes]: [null, [Validators.maxLength(500)]],
      [InvoiceFormKey.InvoiceItems]: this._fb.array([]),
    });
    this._addItem();
  }

  get items(): FormArray {
    return this.invoiceFormGroup.get(InvoiceFormKey.InvoiceItems) as FormArray;
  }

  private _addItem(): void {
    this.items.push(this._createItem());
  }

  private _createItem(): FormGroup {
    return this._fb.group({
      [InvoiceFormKey.Description]: ['', Validators.required],
      [InvoiceFormKey.HsnCode]: [''],
      [InvoiceFormKey.Quantity]: [1, [Validators.required, Validators.min(1)]],
      [InvoiceFormKey.Rate]: [0, [Validators.required, Validators.min(0)]]
    });
  }
}
