import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { MyCasesService } from '../../../features/mycases/services/mycases.service';
import { MycasesComponent } from '../../../features/mycases/mycases.component';
import { HttpService } from '../../../core/services/http/http.service';
import { HttpClient } from'@angular/common/http'; 
import { LoggerService } from '../../../core/services/logger/logger.service';
import { ConfigService } from '../../../core/services/config/config.service';
import { TableFilter } from '../data-view/table-filter';

@Component({
  selector: 'app-mycases-cards',
  templateUrl: './mycases-cards.component.html',
  styleUrls: ['./mycases-cards.component.less']
})
export class MycasesCardsComponent implements AfterViewInit, OnChanges{

  private _name : Array<TableFilter>;

   @Input() 
    filters : Array<TableFilter> = [];
   @Input()
    trigger: number;

  cards: any;
  constructor(
    protected loggerService: LoggerService,
    protected httpService: HttpService,
    private mycases : MyCasesService,
    private mycasesC : MycasesComponent, 
    private http: HttpService, 
    private httpS: HttpClient,
    private configService: ConfigService  ) {
   }
  
   async getCardsData(filters){

     let pageIndex = this.configService.pageIndex;
     let pageSize = this.configService.pageSize;
     let caseStatusFilters = "";
     let caseTypeFilters = "";
     let caseOfficeFilters = "";
     let statusFlag = 0;
     let officeFlag = 0;
     let typeFlag = 0;
     try {
      
     for(let i=0; i<filters.length ;i++){
      if(filters[i].filterDes == "סטטוס"){
        statusFlag = 1;
        caseStatusFilters += "&caseStatus="+filters[i].id;
      }
     }
    if(statusFlag == 0)
        caseStatusFilters = "&caseStatus=";
    if(officeFlag == 0)
        caseOfficeFilters = "&caseOffice=";
    if(typeFlag == 0)
        caseTypeFilters = "&caseType=";
     
        this.cards = await this.http.get( `${this.configService.apiUrl}/Case/GetMyCases?lgEntId=`+"581315"+caseStatusFilters+caseTypeFilters+caseOfficeFilters+"&pageNum="+pageIndex+"&pageSize="+pageSize);
      }
  catch (exception) {
    this.loggerService.error("Error when getting paged data for myCases", exception);
    throw exception;
  }
}

public refresh(){
  this.getCardsData(this.filters);
}

  ngOnChanges(changes : SimpleChanges){
    this.refresh();
  }

  ngAfterViewInit(){
    this.getCardsData(this.filters);
  }
}
