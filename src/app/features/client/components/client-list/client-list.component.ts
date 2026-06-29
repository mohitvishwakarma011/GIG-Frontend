import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal, ViewChild } from "@angular/core";
import { catchError, of, tap } from "rxjs";
import { AppUtils } from "src/app/helpers/app.utils";
import { ClientService, IClientDto } from "../../services/client.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { IBasePagination } from "src/app/shared/entities/entities";
import { MatSort } from "@angular/material/sort";

@Component({
    selector: 'ngx-client-list',
    standalone: false,
    styleUrl: './client-list.component.scss',
    templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly _clientService = inject(ClientService);
    private readonly _appUtils = inject(AppUtils);

    protected displayedColumns: string[] = ['#', 'name', 'gstin', 'billingAddress', 'state'];
    protected clients = signal<IClientDto[]>([]);
    protected dataSource = new MatTableDataSource<IClientDto>(this.clients());
    protected pageSizeOptions = [10, 20, 50];
    protected filter = new IBasePagination('name');

    private _searchTimerRef;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.paginator.page.subscribe(($event:PageEvent)=>{
            console.log($event);
            this.filter.pageSize = $event.pageSize;
            this.filter.pageIndex = $event.pageIndex;
            this._getClients();
        })

        this.sort.sortChange.subscribe((event)=>{
            this.filter.sort = event.active;
            this.filter.order = event.direction;
            this._getClients();
        })
    }

    public ngOnInit(): void {
        this._getClients();
    }

    private _getClients(): void {
        this._clientService.getClients(this.filter)
            .pipe(tap(data => {
                this.clients.set(data);
                this.dataSource.data = this.clients();
            }),
                catchError(err => {
                    this._appUtils.showErrors(err.error);
                    return of(null);
                })).subscribe();
    }

    protected searchChanged(): void {
        clearTimeout(this._searchTimerRef);
        this._searchTimerRef = setTimeout(() => {
            this._getClients();
        }, 500)
    }

    public ngOnDestroy(): void {
        clearTimeout(this._searchTimerRef);
    }
}