import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/services/http/http.service';
import { LoggerService } from '../../../core/services/logger/logger.service';

export interface IDataService {
    getData(): any;
}

@Injectable()
export abstract class DataService implements IDataService {
    constructor(protected httpService: HttpService,
        protected loggerService: LoggerService) {}
        
    getData() {
        throw new Error("Method not implemented.");
    }
}