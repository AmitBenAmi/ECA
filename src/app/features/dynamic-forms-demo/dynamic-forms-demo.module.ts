import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormsDemoComponent } from './dynamic-forms-demo.component';
import { CoreModule } from "../../core/core.module";
import { FormsDemoRoutingModule } from './forms-demo-routes.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsDemoRoutingModule
  ],
  declarations: [DynamicFormsDemoComponent]
})
export class DynamicFormsDemoModule { }
