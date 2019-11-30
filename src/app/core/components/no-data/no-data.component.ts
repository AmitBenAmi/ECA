import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.less']
})
export class NoDataComponent implements OnInit {
  @Input() error: boolean;
  constructor() { }

  ngOnInit() {
  }

}
