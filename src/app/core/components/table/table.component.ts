import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableItem } from './view-model.table-datasource'
import { TableDataSource, SortDirection } from './table-datasource';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<TableItem>;
  dataSource: TableDataSource;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = [];

  private _data: Array<TableItem> = [];
  private _dataSubject: Subject<any>;

  @Input()
  set data(value: Array<TableItem>) {
    this._data = value;
    
    if (this.lazyLoad && this._dataSubject) {
      this.setDataSource();
      this._dataSubject.next();
    }
  }

  @Input() pageSize: number = 20;
  @Output() pageSizeChange = new EventEmitter<number>();
  
  @Input() pageSizeOptions: number[] = [10, 20, 50, 100];
  @Input() pagesLength: number;
  @Input() lazyLoad: boolean = false;

  @Output() fetchPageEvent: EventEmitter<FetchDataEventEmitterValue> = new EventEmitter();

  ngOnInit() {
    if (this.lazyLoad) {
      this._dataSubject = new Subject();
    }

    this.setDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  private setDataSource(): void {
    if (!this.dataSource) {
      this.dataSource = new TableDataSource(this._data, this.lazyLoad, this.fetchPageData.bind(this));
    } else {
      this.dataSource.data = this._data;
    }

    if (this.dataSource &&
        this.dataSource.data &&
        this.dataSource.data.length > 0) {
      this.displayedColumns = Object.keys(this.dataSource.data[0]);
    }
  }

  public async fetchPageData(pageIndex: number, sortField: string, sortDirection: SortDirection): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._dataSubject.pipe(take(1)).subscribe(() => {
        resolve();
      });

      this.fetchPageEvent.emit(new FetchDataEventEmitterValue(pageIndex, sortField, sortDirection));
    });
  }

  public pageChangeEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageSizeChange.emit(this.pageSize);
  }
}

export class FetchDataEventEmitterValue {
  constructor(public pageIndex: number, public sortField: string, public sortDirection: SortDirection) {}
}