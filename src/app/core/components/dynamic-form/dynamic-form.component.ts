import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FieldConfig, FieldType } from "../../../shared/field.interface";

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.createControl(this.fields);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createControl(fields): FormGroup {
    const group = this.fb.group({});

    fields.forEach(field => {
      switch (field.type) {
        case (FieldType.button): {
          return;
        } 
        case (FieldType.group): {
          let subFieldsGroup: FormGroup = this.createControl(field.subFields);
          this.addControlToGroup(group, field.name, subFieldsGroup);
          break;
        }
        default: {
          const control = this.fb.control({
            value: field.value, 
            disabled: field.disabled
          }, this.bindValidations(field.validations || []));

          this.addControlToGroup(group, field.name, control);
          break;
        }
      }
    });

    return group;
  }

  private addControlToGroup(group: FormGroup, fieldName: string, control: FormControl | FormGroup): void {
    group.addControl(fieldName, control);
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        control.markAllAsTouched();
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  public getFieldType() {
    return FieldType;
  }
}
