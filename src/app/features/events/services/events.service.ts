import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/services/http/http.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { ConfigService } from '../../../core/services/config/config.service';

import { DataService, PageData } from '../../../core/services/data/data.service';
import { EventsRouteConfigService } from './events.route.config.service';
import { SortDirection } from 'src/app/core/components/table/table-datasource';

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
    try {
      let events = await this.httpService.post(`${this.configService.apiUrl}/${this.eventsRouteConfigService.api.events}`, {
        caseId: 0,
        legalEntityNumber: '0'
      });
      
      return events;
    } catch (exception) {
      this.loggerService.error("Error when getting data for the events", exception);
      throw exception;
    }
  }

  async getPageData(pageIndex: number, pageSize: number, sortField: string, sortDirection: SortDirection) {
    try {
      let pageData: any = await this.httpService.post(`${this.configService.apiUrl}/${this.eventsRouteConfigService.api.events}/page`, {
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortField: sortField,
        sortDirection: sortDirection
      }, undefined, true);

      return new PageData(pageData.events, pageData.length);
    } catch (exception) {
      this.loggerService.error("Error when getting paged data for the events", exception);
      throw exception;
    }
  }
}
