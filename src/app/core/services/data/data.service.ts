import { Injectable } from '@angular/core';

import { HttpService } from '../http/http.service';
import { LoggerService } from '../logger/logger.service';

export interface IDataService {
    getData(): any;
    getPageData(pageIndex: number, pageSize: number): any;
}

@Injectable()
export abstract class DataService implements IDataService {
    constructor(protected httpService: HttpService,
        protected loggerService: LoggerService) {}
        
    getData() {
        throw new Error("Method not implemented.");
    }

    getPageData(pageIndex: number, pageSize: number) {
        throw new Error("Method not implemented.");
    }
}