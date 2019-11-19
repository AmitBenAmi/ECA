import { Component, OnInit } from '@angular/core';
import { TableItem } from '../table/view-model.table-datasource';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.less']
})
export class MainViewComponent implements OnInit {
  data: Array<TableItem>;

  constructor(private dataService: DataService) { 
  }

  async ngOnInit() {
    let dataFromService = await this.dataService.getData();
    this.data = this.convertDataToTableItem(dataFromService);
  }

  private convertDataToTableItem(data: any): Array<TableItem> {
    if (this.isDataArray(data)) {
      return data;
    } else {
      let dataAsArray: Array<TableItem> = [
        data
      ];

      return dataAsArray;
    }
  }

  private isDataArray(data: any): boolean {
    return Array.isArray(data);
  }

}
