import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/services/http/http.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { ConfigService } from '../../../core/services/config/config.service';

import { DataService } from '../data/data.service';
import { DataRouteConfigService } from '../config/data.route.config.service';

@Injectable()
export class EventsService extends DataService {

  constructor(
    httpService: HttpService, 
    loggerService: LoggerService, 
    private configService: ConfigService,
    private dataRouteConfigService: DataRouteConfigService) {
    super(httpService, loggerService);
  }

  async getData() {
    let events = await this.httpService.post(`${this.configService.apiUrl}/${this.dataRouteConfigService.api.events}`, {
      caseId: 0,
      legalEntityNumber: '0'
    })
    return events;
  }
}
