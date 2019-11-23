import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/services/http/http.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { ConfigService } from '../../../core/services/config/config.service';

import { DataService } from '../../../core/services/data/data.service';
import { EventsRouteConfigService } from './events.route.config.service';

@Injectable()
export class EventsService extends DataService {

  constructor(
    httpService: HttpService, 
    loggerService: LoggerService, 
    private configService: ConfigService,
    private eventsRouteConfigService: EventsRouteConfigService) {
    super(httpService, loggerService);
  }

  async getData() {
    let events = await this.httpService.post(`${this.configService.apiUrl}/${this.eventsRouteConfigService.api.events}`, {
      caseId: 0,
      legalEntityNumber: '0'
    });
    
    return events;
  }

  async getPageData(pageIndex: number, pageSize: number) {
    let events = await this.httpService.post(`${this.configService.apiUrl}/${this.eventsRouteConfigService.api.events}/page`, {
      pageIndex: pageIndex,
      pageSize: pageSize
    });

    return events;
  }
}
