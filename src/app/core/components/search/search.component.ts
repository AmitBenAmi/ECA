import { Component, OnInit, Inject } from '@angular/core';
import {caseModel} from '../../../features/model/case.model';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../core/services/config/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  SearchCollection: caseModel[] = [];
  SearchFlag = 0;
  searchlength = 0;
  searchCase="";
  dataSource = [];
  search=0;
  nodata=0;
  legalEntityId = 576401;
  error = 500;
  display: boolean = false;
  displayErr: boolean = false;

  // AutocompleteJason = [
  //    {
  //     "cseId": 2291312,
  //     "dispId": "510767-91-19",
  //     "cseType": "שטרות",
  //     "creditorName": "יהודה שלום",
  //     "deborName": "ישראל בן חיים",
  //     "date": "2020-02-20",
  //     "status": "112233",
  //    },
  //    {
  //     "cseId": 2641114,
  //     "dispId": "513767-63-20",
  //     "cseType": "פסק דין כספי",
  //     "creditorName": "גיל מכבי",
  //     "deborName": "יונתן בסט",
  //     "date": "2020-02-20",
  //     "status": "112233",
  //    },
  //    {
  //     "cseId": 2191111,
  //     "dispId": "511767-91-19",
  //     "cseType": "שטרות",
  //     "creditorName": "ישראל ישראלי",
  //     "deborName": "אסתר כהן",
  //     "date": "2020-02-20",
  //     "status": "112233",
  //    }
  // ]

  constructor(private http: HttpClient, private configService: ConfigService, private router: Router) { }

  startSearch(){
    this.search=1;
  }

  GetAutocomplete(id,value,pagesize){
      this.http.get<any>(`${this.configService.apiUrl}/Case/GetAutoCompleteCaseSearch?lgEntId=`+id+"&search="+value+"&pageSize="+pagesize+"&tagOp=%3Cb%3E&tagCl=%3Cb%3E").subscribe(
      result => { 
        this.dataSource = result;
        this.SearchFlag = 1;
        if( this.dataSource.length == 0)
          this.display= true;
          else
          this.display= false;

        this.error = 0; 
      },
      error => {
        this.display= false;
        this.error = error.status;
      });
  }

  SearchItem(val){
    var id = this.legalEntityId;
    if(val.length>2){
        this.display= true;
        this.dataSource = [];
        this.searchlength = 1;
        this.GetAutocomplete(id,val,30);
      }
       else{
        this.display= false;
        this.searchlength = 0;
       }
  }

  displayFn(subject) {
    if(subject!=null)
      this.searchCase = subject.dispId;
    return subject ? subject.dispId: undefined;
  }

  navigate(){
    this.router.navigate(['/caseinfo']);
  }

  ngOnInit() {
  }

}
