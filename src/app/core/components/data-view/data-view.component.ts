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
  error: boolean;

  constructor(private dataService: DataService) {
    this.pageSize = 5;
    this.error = false;
  }

  async ngOnInit() {
    try {
      let dataFromService = await this.dataService.getPageData(0, this.pageSize);
      this.data = this.convertDataToTableItem(dataFromService);
    } catch (exception) {
      this.error = true;
    }
  }

  private convertDataToTableItem(data: any): Array<TableItem> {
    if (!data) {
      return undefined;
    } else if (this.isDataArray(data)) {
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
    try {
      let dataFromService = await this.dataService.getPageData(pageChangeEventData.pageIndex, pageChangeEventData.pageSize);
      this.data = this.convertDataToTableItem(dataFromService);
      this.error = false;
    } catch (exception) {
      this.error = true;
    }
  }
}
