import { Component, ViewChild, OnInit} from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig, FieldType } from "../../shared/field.interface";
import { DynamicFormComponent } from "../../core/components/dynamic-form/dynamic-form.component";
import { validateEmail } from './validators/email-validator';

@Component({
  selector: 'app-dynamic-forms-demo',
  templateUrl: './dynamic-forms-demo.component.html',
  styleUrls: ['./dynamic-forms-demo.component.less']
})
export class DynamicFormsDemoComponent {
  @ViewChild(DynamicFormComponent, {static: true}) form: DynamicFormComponent;

  regConfig: FieldConfig[] = [
    {
      type: FieldType.group,
      name: 'subObject',
      subFields: [{
        type: FieldType.input,
        label: 'Sub field input property',
        inputType: 'text',
        value: 'Sub Property Value',
        name: 'subPropertyInput'
      },
      {
        type: FieldType.date,
        label: 'Sub field date property',
        name: 'subPropertyDate',
        validations: [{
          name: "required",
          validator: Validators.required,
          message: "חובה למלא שדה זה"
        }]
      }]
    },
    {
      type: FieldType.input,
      label: "שם משתמש",
      inputType: "text",
      value: "איתי",
      disabled: true,
      name: "name",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "חובה למלא שדה זה"
        },
        {
          name: "pattern",
          validator: Validators.pattern("^[א-ת]+$"),
          message: "חייב להיות טקסט בלבד"
        }
      ]
    },
    {
      type: FieldType.input,
      label: "אימייל",
      inputType: "email",
      name: "email",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: validateEmail,
          message: "Invalid email"
        }
      ]
    },
    {
      type: FieldType.input,
      label: "סיסמא",
      inputType: "password",
      name: "password",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Password Required"
        }
      ]
    },
    {
      type: FieldType.radio,
      label: "מין",
      name: "gender",
      options: ["זכר", "נקבה"],
      value: "Male"
    },
    {
      type: FieldType.date,
      label: "תאריך לידה",
      name: "dob",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Date of Birth Required"
        }
      ]
    },
    {
      type: FieldType.select,
      label: "מדינה",
      name: "country",
      value: "ישראל",
      options: ["סין", "הודו", "אנגליה", "ארצות הברית"]
    },
    {
      type: FieldType.checkbox,
      label: "מסכים לתנאים",
      name: "term",
      value: true
    },
    {
      type: FieldType.button,
      label: "Save"
    }
  ];

  submit(value: any) {
  }

  OnInit() {
  }
}