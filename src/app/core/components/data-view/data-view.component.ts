import { Component, OnInit } from '@angular/core';
import { TableItem } from '../table/view-model.table-datasource';
import { PageChangeEventData } from '../table/table.component';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.less']
})
export class DataViewComponent implements OnInit {
  data: Array<TableItem>;
  pageSize: number;

  constructor(private dataService: DataService) {
    this.pageSize = 5;
  }

  async ngOnInit() {
    let dataFromService = await this.dataService.getPageData(0, this.pageSize);
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

  public async pageChangeEvent(pageChangeEventData: PageChangeEventData) {
    let dataFromService = await this.dataService.getPageData(pageChangeEventData.pageIndex, pageChangeEventData.pageSize);
    this.data = this.convertDataToTableItem(dataFromService);
  }
}
