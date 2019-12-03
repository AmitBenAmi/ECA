import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from "@angular/core";
import { FieldType } from "../../../shared/field.interface";
import { DynamicFormGroupComponent } from '../dynamic-form-group/dynamic-form-group.component';
import { DynamicFieldDirective } from './dynamic-field.directive';

@Directive({
  selector: '[dynamicFieldGroup]'
})
export class DynamicFieldGroupDirective extends DynamicFieldDirective implements OnInit {
  constructor(resolver: ComponentFactoryResolver, container: ViewContainerRef) {
      super(resolver, container);
      this.componentMapper[FieldType.group] = DynamicFormGroupComponent;
  }

  protected setComponentField(componentRef: any): void {
    componentRef.instance.fields = this.field.subFields;
  }

  protected setComponentGroup(componentRef: any): void {
    componentRef.instance.group = this.group.controls[this.field.name];
  }
}
