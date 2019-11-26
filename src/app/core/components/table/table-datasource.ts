import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { mergeMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subject } from 'rxjs';
import { TableItem } from './view-model.table-datasource';

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  paginator: MatPaginator;
  sort: MatSort;
  private _pageInitiazlied: boolean = false;

  constructor(
    public data: Array<TableItem>, 
    private lazyLoadPage: boolean = false,
    private pageDataFetchCallback: (pageIndex: number, sortField: string, sortDirection: SortDirection) => Promise<void> = undefined) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Array<TableItem>> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    let dataMutations: any = [
      observableOf(this.data),
      this.sort.sortChange
    ];

    if (this.paginator) {
      dataMutations.push(this.paginator.page);
    }

    return merge(...dataMutations)
      .pipe(
        mergeMap(async () => {
          if (this.lazyLoadPage) {
            if (!this._pageInitiazlied && this.data) {
              this._pageInitiazlied = true;
            } else {
              await this.pageDataFetchCallback(
                this.paginator.pageIndex, 
                this.sort.active, 
                SortDirection.getDirection(this.sort.direction));
            }
            
            return this.data;
          } else {
            let data = this.getSortedData([...this.data]);

            if (this.paginator) {
              data = this.getPagedData(data);
            }
            
            return data;
          }
        })
      );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Array<TableItem>) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Array<TableItem>) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      return compare(a[this.sort.active], b[this.sort.active], isAsc);
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export enum SortDirection {
  ASC,
  DESC,
  NONE
}

export namespace SortDirection {
  export function getDirection(sortDirection: string) {
    switch(sortDirection) {
      case('desc'): {
        return SortDirection.DESC;
      } 
      case('asc'): {
        return SortDirection.ASC;
      }
      default: {
        return SortDirection.NONE;
      }
    }
  }
}