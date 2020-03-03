import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ColumnDefinition } from 'src/app/core/components/table/table.component';
import { TableFilter } from 'src/app/core/components/data-view/table-filter';
import { DataViewComponent } from 'src/app/core/components/data-view/data-view.component'

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.less']
})


export class EventsTableComponent implements AfterViewInit {

  @ViewChild(DataViewComponent, {static: false})
  private dataView: DataViewComponent;

  public columns: ColumnDefinition[];
  public filters: TableFilter[];
  constructor() { 
    this.columns = []
      // this.columns.push(new ColumnDefinition('EventId', 'מזהה אירוע'));
      // this.columns.push(new ColumnDefinition('CreateEventDate', 'תאריך יציאה'));
      // this.columns.push(new ColumnDefinition('EventType', 'סוג אירוע'));
      // this.columns.push(new ColumnDefinition('DescType', 'תיאור'));
      // this.columns.push(new ColumnDefinition('IsDistribution', 'להפצה'));
      // this.columns.push(new ColumnDefinition('DistributionDate', 'תאריך הפצה'));
      // this.columns.push(new ColumnDefinition('FileName', 'שם קובץ'));
      // this.columns.push(new ColumnDefinition('IsDocuments', 'האם מסמך'));
      this.columns.push(new ColumnDefinition('cseId', 'מספר תיק'));

      this.columns.push(new ColumnDefinition('date', 'תאריך'));

      this.columns.push(new ColumnDefinition('eventType', 'סוג האירוע'));

      this.columns.push(new ColumnDefinition('desc', 'תיאור פעילות '));
    this.filters = [];
    var f: TableFilter = {
      filterDes: "פילטר לדוגמא",
      id: -2,
      filterValue: [242],
      isChecked: true
    }
    this.filters.push(f)

    
  }

  ngAfterViewInit() {
  }

  public refresh() {
    this.dataView.refresh()
  }
}
