import { Component, inject, OnInit, signal } from "@angular/core";
import { catchError, of, tap } from "rxjs";
import { AppUtils } from "src/app/helpers/app.utils";
import { ClientService, IClientDto } from "../../services/client.service";

@Component({
    selector: 'ngx-client-list',
    standalone: false,
    styleUrl: './client-list.component.scss',
    templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
    private readonly _clientService = inject(ClientService);
    private readonly _appUtils = inject(AppUtils);

    protected clients = signal<IClientDto[]>(null);

    public ngOnInit(): void {
        this._getClients();
    }

    private _getClients(): void {
        this._clientService.getClients()
            .pipe(tap(data => {
                this.clients.set(data);
            }),
                catchError(err => {
                    this._appUtils.showErrors(err.error);
                    return of(null);
                })).subscribe();
    }
}