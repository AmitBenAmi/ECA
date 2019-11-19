import { HttpService } from '../http/http.service';
import { LoggerService } from '../logger/logger.service';

export interface IDataService {
    getData(): any;
}

export abstract class DataService implements IDataService {
    constructor(protected httpService: HttpService,
        protected loggerService: LoggerService) {}
        
    getData() {
        throw new Error("Method not implemented.");
    }
}