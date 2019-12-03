import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/shared/field.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.less']
})
export class DynamicFormGroupComponent implements OnInit {

  fields: Array<FieldConfig>;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
