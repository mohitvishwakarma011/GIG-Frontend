import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { InvoiceFormKey } from '../../../entities/entities';

@Component({
  selector: 'ngx-invoice-item-detail',
  standalone: false,
  templateUrl: './invoice-item-detail.component.html',
  styleUrl: './invoice-item-detail.component.scss'
})
export class InvoiceItemDetailComponent implements OnInit {
  @Input() invoiceItemFormGroup: FormGroup = null;
  protected invoiceItemFormGroupList: FormArray = null;
  protected displayedColumns = ['#', 'description', 'hsnCode', 'quantity', 'rate', 'amount', 'action'];

  public ngOnInit(): void {
    this.invoiceItemFormGroupList = this.invoiceItemFormGroup.controls[InvoiceFormKey.InvoiceItems] as FormArray;
  }
}
