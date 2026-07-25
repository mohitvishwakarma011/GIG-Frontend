import { Component, inject, input, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceFormKey } from '../../../entities/entities';

@Component({
  selector: 'ngx-invoice-item-detail',
  standalone: false,
  templateUrl: './invoice-item-detail.component.html',
  styleUrl: './invoice-item-detail.component.scss'
})
export class InvoiceItemDetailComponent implements OnInit {
  @Input() invoiceItemFormGroup: FormGroup | null = null;
  protected invoiceItemFormGroupList: FormArray | null = null;
  protected readonly displayedColumns = ['#', 'description', 'hsnCode', 'quantity', 'rate', 'amount', 'action'];
  protected readonly InvoiceFormKey = InvoiceFormKey;
  protected isModelLoaded = input(false);
  
  private readonly _fb = inject(FormBuilder);

  public ngOnInit(): void {
    this.invoiceItemFormGroupList = this.invoiceItemFormGroup?.get(InvoiceFormKey.InvoiceItems) as FormArray;
  }

  protected get invoiceItems(): FormArray {
    return this.invoiceItemFormGroup?.get(InvoiceFormKey.InvoiceItems) as FormArray;
  }

  protected addItem(): void {
    this.invoiceItems.push(this._createItem());
  }

  protected removeItem(index: number): void {
    if (this.invoiceItems?.length) {
      this.invoiceItems.removeAt(index);
    }
  }

  protected getAmount(item: FormGroup): number {
    const quantity = Number(item.get(InvoiceFormKey.Quantity)?.value || 0);
    const rate = Number(item.get(InvoiceFormKey.Rate)?.value || 0);
    return quantity * rate;
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
