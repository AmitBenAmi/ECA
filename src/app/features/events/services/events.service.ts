import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/services/http/http.service';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { ConfigService } from '../../../core/services/config/config.service';

import { DataService, PageData } from '../../../core/services/data/data.service';
import { EventsRouteConfigService } from './events.route.config.service';
import { SortDirection } from 'src/app/core/components/table/table-datasource';
import { TableFilter } from 'src/app/core/components/data-view/table-filter';

@Injectable()
export class EventsService extends DataService {

  constructor(
    httpService: HttpService, 
    loggerService: LoggerService, 
    private configService: ConfigService,
    private eventsRouteConfigService: EventsRouteConfigService) {
    super(httpService, loggerService);
  }
  async getData(filters?: Array<TableFilter>) {

    try {

      // let events = await this.httpService.post(`${this.configService.apiUrl}/${this.eventsRouteConfigService.api.events}`, {

      //   caseId: 0,

      //   legalEntityNumber: '0'

      // });

 

      let events = await this.httpService.get(`http://172.18.56.198:8083/api/Event/GetEvents?lgEntId=580305&lastDays=200&pageNum=1&pageSize=3`);

      

      return events;

    } catch (exception) {

      this.loggerService.error("Error when getting data for the events", exception);

      throw exception;

    }

  }

 

  async getPageData(pageIndex: number, pageSize: number, sortField: string, sortDirection: SortDirection, filters?: Array<TableFilter>) {

    try {

      //alert(JSON.stringify(filters));

      // let pageData: any = await this.httpService.post(`${this.configService.apiUrl}/${this.eventsRouteConfigService.api.events}/page`, {

      //   pageIndex: pageIndex,

      //   pageSize: pageSize,

      //   sortField: sortField,

      //   sortDirection: sortDirection

      // }, undefined, true);

 

      var events;

      if( filters[0].isChecked)
        // events = await this.httpService.get(`http://172.18.56.198:8083/api/Event/GetEvents?lgEntId=580305&lastDays=200&pageNum=1&pageSize=3`);
        events = 
        [{"cseId":10037250,"dispId":"500767-01-19","eventType":"בתיק הוגדלה קרן חוב מספר: 30 מסוג קרן אגרה בסכום של 5.00 ₪  נכון לתאריך: 28/01/2020 סיבת ההגדלה: טעות בחישוב","desc":"הגדלת קרן חוב","date":"28.01.20","docId":171366124},{"cseId":10037250,"dispId":"500767-01-19","eventType":"התבצע עידכון גורם:   חייב 1 שלום חיים אביקסיס ת.ז. 034467381 \r\n.עודכנה כתובת  \r\n כתובות ישנה :שוחט מניה 12 דירה 11  ראשון לציון 7524170","desc":"עדכון גורם בתיק","date":"28.01.20","docId":null},{"cseId":10037250,"dispId":"500767-01-19","eventType":"התבצע עידכון גורם:   חייב 1 שלום חיים אביקסיס ת.ז. 034467381 \r\n.עודכן שם .  שם ישן :שלום אביקסיס","desc":"עדכון גורם בתיק","date":"28.01.20","docId":null}];
        
         

      else
        // events = await this.httpService.get(`http://172.18.56.198:8083/api/Event/GetEvents?lgEntId=580305&filters=362&filters=340&filters=99763&filters=7&lastDays=200&pageNum=1&pageSize=3`);        
        events = [{"cseId":10037250,"dispId":"500767-01-19","eventType":"התבצע עידכון גורם:   חייב 1 שלום חיים אביקסיס ת.ז. 034467381 \r\n.עודכנה כתובת  \r\n כתובות ישנה :שוחט מניה 12 דירה 11  ראשון לציון 7524170","desc":"עדכון גורם בתיק","date":"28.01.20","docId":null},{"cseId":10037250,"dispId":"500767-01-19","eventType":"התבצע עידכון גורם:   חייב 1 שלום חיים אביקסיס ת.ז. 034467381 \r\n.עודכן שם .  שם ישן :שלום אביקסיס","desc":"עדכון גורם בתיק","date":"28.01.20","docId":null},{"cseId":10037250,"dispId":"500767-01-19","eventType":"ניתנה החלטה ברישום עיקול צד ג' בתהליך 8 מתאריך 27/01/2020","desc":"ניתנה החלטה בתיק","date":"27.01.20","docId":171366124}];

 
 

      //return new PageData(pageData.events, pageData.length);

      return new PageData(events, events.length);

    } catch (exception) {

      this.loggerService.error("Error when getting paged data for the events", exception);

      throw exception;

    }
  }
  // async getData(filters?: Array<TableFilter>) {
  //   try {
  //     let events = await this.httpService.post(`${this.configService.apiUrl}/${this.eventsRouteConfigService.api.events}`, {
  //       caseId: 0,
  //       legalEntityNumber: '0'
  //     });
      
  //     return events;
  //   } catch (exception) {
  //     this.loggerService.error("Error when getting data for the events", exception);
  //     throw exception;
  //   }
  // }

  // async getPageData(pageIndex: number, pageSize: number, sortField: string, sortDirection: SortDirection, filters?: Array<TableFilter>) {
  //   try {
  //     alert(JSON.stringify(filters))
  //     let pageData: any = await this.httpService.post(`${this.configService.apiUrl}/${this.eventsRouteConfigService.api.events}/page`, {
  //       pageIndex: pageIndex,
  //       pageSize: pageSize,
  //       sortField: sortField,
  //       sortDirection: sortDirection
  //     }, undefined, true);

  //     return new PageData(pageData.events, 3);
  //   } catch (exception) {
  //     this.loggerService.error("Error when getting paged data for the events", exception);
  //     throw exception;
  //   }
  // }
}
