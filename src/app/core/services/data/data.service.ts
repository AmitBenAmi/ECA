import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';
import { LoggerService } from '../logger/logger.service';

export class PageData {
    constructor(public data: any, public length: number) {}
}

export interface IDataService {
    getData(): any;
    getPageData(pageIndex: number, pageSize: number): PageData | Promise<PageData>;
}

@Injectable()
export abstract class DataService implements IDataService {
    constructor(protected httpService: HttpService,
        protected loggerService: LoggerService) {}
        
    getData(): any {
        throw new Error("Method not implemented.");
    }

    getPageData(pageIndex: number, pageSize: number): PageData | Promise<PageData> {
        throw new Error("Method not implemented.");
    }
}