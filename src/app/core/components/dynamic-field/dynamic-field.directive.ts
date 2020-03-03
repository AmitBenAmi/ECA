import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig, FieldType } from "../../../shared/field.interface";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadioButtonComponent } from "../radio-button/radio-button.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit{

  protected componentMapper: { [key: number]: any } = {
    [FieldType.input]: InputComponent,
    [FieldType.button]: ButtonComponent,
    [FieldType.select]: SelectComponent,
    [FieldType.date]: DateComponent,
    [FieldType.radio]: RadioButtonComponent,
    [FieldType.checkbox]: CheckboxComponent,
  };

  @Input() protected field: FieldConfig;
  @Input() protected group: FormGroup;
  protected componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit() {
    this.init();
  }
  
  protected init() {
    const factory = this.getFactory(this.field.type);
    this.componentRef = this.container.createComponent(factory);
    this.setComponentField(this.componentRef);
    this.setComponentGroup(this.componentRef);
  }

  protected setComponentField(componentRef: any): void {
    componentRef.instance.field = this.field;
  }

  protected setComponentGroup(componentRef: any): void {
    componentRef.instance.group = this.group;
  }

  private getFactory(fieldType: FieldType) {
    return this.resolver.resolveComponentFactory(this.componentMapper[fieldType]);
  }
}
