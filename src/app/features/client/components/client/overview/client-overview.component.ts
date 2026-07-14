import { Component, inject, Input, OnInit, signal } from "@angular/core";
import { ClientService, IClientDto } from "../../../services/client.service";
import { catchError, of, tap } from "rxjs";
import { AppUtils } from "src/app/helpers/app.utils";

@Component({
    selector: 'ngx-client-overview',
    standalone: false,
    templateUrl: './client-overview.component.html',
    styleUrl: './client-overview.component.scss'
})
export class ClientOverviewComponent implements OnInit {
    @Input() clientId: number = 0;

    private readonly _clientService = inject(ClientService);
    private readonly _appUtils = inject(AppUtils);

    protected client = signal<IClientDto>(null);
    protected initials: string = '';
    protected isLoaded = signal(false);

    public ngOnInit(): void {
        this._getClientOverview();
    }

    private _getClientOverview(): void {
        this._clientService.getClientById(this.clientId)
            .pipe(tap(data => {
                this.client.set(data);
                this._extractClientInitials(data.name);
                this.isLoaded.set(true);
            }),
                catchError(err => {
                    this.isLoaded.set(true);
                    this._appUtils.showErrors(err.error);
                    return of();
                }))
            .subscribe();
    }

    private _extractClientInitials(name: string): void {
        this.initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
}