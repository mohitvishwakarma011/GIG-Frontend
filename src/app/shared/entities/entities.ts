import { Helpers } from "src/app/helpers/helpers";

export class IBasePagination {
    pageSize: number;
    pageIndex: number;
    sort: string;
    order: string;
    search: string;

    constructor(sort: string) {
        this.pageSize = 10;
        this.pageIndex = 0;
        this.order = 'asc';
        this.search = '';
        this.sort = sort;
    }

    public toQueryString():string{
        let query = `?pageSize=${this.pageSize}&pageIndex=${this.pageIndex}&sort=${this.sort}&order=${this.order}`;

        if(!Helpers.isNullOrEmpty(this.search)){
            query = `${query}&search=${this.search}`;
        }
        return query;
    }
}