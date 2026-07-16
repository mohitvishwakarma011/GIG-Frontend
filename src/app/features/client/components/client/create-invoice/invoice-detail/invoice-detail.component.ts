import { Component, inject, Input, OnInit, signal } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { tap } from "rxjs";
import { ClientService, IClientSelectOptionDto } from "src/app/features/client/services/client.service";
import { InvoiceFormKey } from "../../../entities/entities";

@Component({
    selector: 'ngx-invoice-detail',
    templateUrl: './invoice-detail.component.html',
    standalone: false,
    styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent implements OnInit {
    @Input() invoiceFormGroup: FormGroup = null;
    protected isModelLoaded = signal(false);
    protected clienOptions = signal<IClientSelectOptionDto[]>([]);
    protected readonly InvoiceFormKey = InvoiceFormKey;

    private readonly _clientService = inject(ClientService);

    public ngOnInit(): void {
        this._getClientOptions();
    }

    private _getClientOptions(): void {
        this._clientService.getClientSelectOptions()
            .pipe(tap(data => {
                this.isModelLoaded.set(true);
                this.clienOptions.set(data);
            })).subscribe();
    }
}

