import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableItem } from '../table/view-model.table-datasource';
import { DataService } from '../../services/data/data.service';
import { FetchDataEventEmitterValue } from '../table/table.component';
import { SortDirection } from '../table/table-datasource';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.less']
})
export class DataViewComponent implements OnInit {
  data: Array<TableItem>;
  pageSize: number;
  pagesLength: number;
  loading: boolean;
  error: boolean;
  lazyLoad: boolean = false;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.pageSize = 5;
    this.error = false;
    this.loading = true;

    if (this.route.snapshot.data &&
        this.route.snapshot.data['lazyLoad'] != undefined &&
        typeof this.route.snapshot.data['lazyLoad'] === 'boolean') {
      this.lazyLoad = this.route.snapshot.data['lazyLoad'];
    }
  }

  async ngOnInit() {
    await this.fetchData(0);
  }

  private async fetchData(pageIndex: number, sortField: string = undefined, sortDirection: SortDirection = SortDirection.NONE) {
    try {
      let dataFromService;
      if (this.lazyLoad) {
        let promisedDataFromService = await this.dataService.getPageData(pageIndex, this.pageSize, sortField, sortDirection);
        dataFromService = promisedDataFromService.data;
        this.pagesLength = promisedDataFromService.length;
      } else {
        dataFromService = await this.dataService.getData();
      }

      this.error = false;
      this.data = this.convertDataToTableItem(dataFromService);
    } catch (exception) {
      this.error = true;
    } finally {
      this.loading = false;
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

  public async fetchPageEvent(fetchEventData: FetchDataEventEmitterValue) {
    this.fetchData(fetchEventData.pageIndex, fetchEventData.sortField, fetchEventData.sortDirection);
  }
}