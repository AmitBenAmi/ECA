import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableItem } from '../table/view-model.table-datasource';
import { DataService } from '../../services/data/data.service';
import { FetchDataEventEmitterValue, ColumnDefinition } from '../table/table.component';
import { SortDirection } from '../table/table-datasource';
import { TableFilter } from './table-filter';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.less']
})
export class DataViewComponent implements OnInit {
  data: Array<TableItem>;
  @Input()
  filters: Array<TableFilter>;
  @Input()
  dataColumns: Array<ColumnDefinition>;
  pageSize: number;
  pagesLength: number;
  loading: boolean;
  error: boolean;
  lazyLoad: boolean = false;
  currPageIndex: number;
  currSortField: string;
  currSortDir: SortDirection;

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
  
  public refresh() {
    this.fetchData(this.currPageIndex, this.currSortField, this.currSortDir);
  }

  private async fetchData(pageIndex: number, sortField: string = undefined, sortDirection: SortDirection = SortDirection.NONE) {
    try {
      let dataFromService;
      if (this.lazyLoad) {
        let promisedDataFromService = await this.dataService.getPageData(pageIndex, this.pageSize, sortField, sortDirection, this.filters);
        dataFromService = promisedDataFromService.data;
        this.pagesLength = promisedDataFromService.length;
        this.currPageIndex = pageIndex;
        this.currSortField = sortField;
        this.currSortDir = sortDirection;
      } else {
        dataFromService = await this.dataService.getData(this.filters);
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