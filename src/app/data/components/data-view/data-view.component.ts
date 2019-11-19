import { Component, OnInit } from '@angular/core';
import { TableItem } from '../../../core/components/table/view-model.table-datasource';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.less']
})
export class DataViewComponent implements OnInit {
  data: Array<TableItem>;

  constructor(private dataService: DataService) { }

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
