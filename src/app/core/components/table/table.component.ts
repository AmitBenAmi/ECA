import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TableItem } from './view-model.table-datasource'
import { TableDataSource, SortDirection } from './table-datasource';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<TableItem>;
  dataSource: TableDataSource;

  @ContentChild('expandedRowDetail', {static: false}) expandedRowDetailImpl: TemplateRef<any>;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: Array<string> = [];
  namedColumns: Array<string> = [];
  expandedRow: TableItem;

  private _data: Array<TableItem> = [];
  private _dataSubject: Subject<any>;
  readonly EXTRA_DATA_PROPERTY_NAME: string = 'extraData';
  readonly EXTRA_DATA_COLUMNS_PROPERTY_NAME: string = 'columnDefinitions';

  @Input()
  set data(value: Array<TableItem>) {
    this._data = value;
    
    if (this.lazyLoad && this._dataSubject) {
      this.setDataSource();
      this._dataSubject.next();
    }
  }

  @Input() columns: ColumnDefinition[];
  @Input() pageSize: number = 20;
  @Output() pageSizeChange = new EventEmitter<number>();
  
  @Input() pageSizeOptions: Array<number> = [10, 20, 50, 100];
  @Input() pagesLength: number;
  @Input() lazyLoad: boolean = false;
  @Input() expandable: boolean = false;
  @Input() expandableDetailAsTemplate: boolean = false;
  @Input() pageable: boolean = true;

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

    this.clearColumns();

    if (this.columns && this.columns.length > 0) {
      this.columns.forEach((columnDefinition) => {
        if (!this.isColumnExtraData(columnDefinition.name)) {
          this.addColumn(columnDefinition.name, columnDefinition.displayName);
        }
      });
    } else if (this.dataSource && this.dataSource.data && this.dataSource.data.length > 0) {
      Object.keys(this.dataSource.data[0]).forEach((column) => {
        if (!this.isColumnExtraData(column)) {
          this.addColumn(column, column);
        }
      });
    }
  }

  private clearColumns(): void {
    this.namedColumns = [];
    this.displayedColumns = [];
  }

  private addColumn(columnName: string, columnDisplayName: string): void {
    this.namedColumns.push(columnName);
    this.displayedColumns.push(columnDisplayName);
  }

  private isColumnExtraData(columnName: string): boolean {
    return columnName === this.EXTRA_DATA_PROPERTY_NAME;
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

export class ColumnDefinition {
  constructor(public name: string, public displayName: string) {}
}