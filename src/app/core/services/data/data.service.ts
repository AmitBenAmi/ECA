import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';
import { LoggerService } from '../logger/logger.service';
import { SortDirection } from '../../components/table/table-datasource';
import { TableFilter } from '../../components/data-view/table-filter';

export class PageData {
    constructor(public data: any, public length: number) {}
}

export interface IDataService {
    getData(): any;
    getPageData(pageIndex: number, pageSize: number, sortField: string, sortDirection: SortDirection, filters?: Array<TableFilter>): PageData | Promise<PageData>;
}

@Injectable()
export abstract class DataService implements IDataService {
    constructor(protected httpService: HttpService,
        protected loggerService: LoggerService) {}
        
    getData(filters?: Array<TableFilter>): any {
        throw new Error("Method not implemented.");
    }

    getPageData(pageIndex: number, pageSize: number, sortField: string, sortDirection: SortDirection, filters?: Array<TableFilter>): PageData | Promise<PageData> {
        throw new Error("Method not implemented.");
    }
}