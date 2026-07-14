import { Component, inject, OnInit, signal } from "@angular/core";
import { ClientService, IClientDto } from "../../services/client.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'ngx-client',
    templateUrl: './client.component.html',
    styleUrl: './client.component.scss',
    standalone: false
})
export class ClientComponent implements OnInit {
    private readonly _clientService = inject(ClientService);
    protected clientId: number;

    constructor(private readonly route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.clientId = params['id'];
        });
    }

    public ngOnInit(): void {
       
    }
}