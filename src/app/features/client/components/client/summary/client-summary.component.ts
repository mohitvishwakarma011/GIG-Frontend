import { Component, inject, Input, OnInit, signal } from "@angular/core";
import { ClientService, IClientSummaryDto } from "../../../services/client.service";
import { catchError, of, tap } from "rxjs";
import { AppUtils } from "src/app/helpers/app.utils";

@Component({
    selector: 'ngx-client-summary',
    standalone: false,
    templateUrl: './client-summary.component.html',
    styleUrl: './client-summary.component.scss'
})
export class ClientSummaryComponent implements OnInit {
    @Input() clientId: number = 0;

    private readonly _clientService = inject(ClientService);
    private readonly _appUtils = inject(AppUtils);
    protected isModelLoaded = signal(false);

    protected clientSummary = signal<IClientSummaryDto>(null);
    public ngOnInit(): void {
        this._getClientSummary();
    }

    private _getClientSummary(): void {
        this._clientService.getClientSummary(this.clientId)
            .pipe(tap(data => {
                this.clientSummary.set(data);
                this.isModelLoaded.set(true);
            }),
                catchError(err => {
                    this._appUtils.showErrors(err.error);
                    this.isModelLoaded.set(true);
                    return of();
                })).subscribe();
    }
}