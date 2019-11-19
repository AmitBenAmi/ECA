import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { HttpService } from '../../../core/services/http/http.service';
import { LoggerService } from '../../../core/services/logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends DataService {

  constructor(httpService: HttpService, loggerService: LoggerService) {
    super(httpService, loggerService);
  }

  getData() {
    return [{
      name: 'Amit',
      lastName: 'Ben Ami'
    }];
  }
}
