import { Component, ViewChild, OnInit} from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig } from "../../shared/field.interface";
import { DynamicFormComponent } from "../../core/components/dynamic-form/dynamic-form.component";


@Component({
  selector: 'app-dynamic-forms-demo',
  templateUrl: './dynamic-forms-demo.component.html',
  styleUrls: ['./dynamic-forms-demo.component.less']
})
export class DynamicFormsDemoComponent {
  @ViewChild(DynamicFormComponent, {static: true}) form: DynamicFormComponent;

  regConfig: FieldConfig[] = [
    {
      type: "input",
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
      type: "input",
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
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]
    },
    {
      type: "input",
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
      type: "radiobutton",
      label: "מין",
      name: "gender",
      options: ["זכר", "נקבה"],
      value: "Male"
    },
    {
      type: "date",
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
      type: "select",
      label: "מדינה",
      name: "country",
      value: "ישראל",
      options: ["סין", "הודו", "אנגליה", "ארצות הברית"]
    },
    {
      type: "checkbox",
      label: "מסכים לתנאים",
      name: "term",
      value: true
    },
    {
      type: "button",
      label: "Save"
    }
  ];

  submit(value: any) {}

  OnInit() {

  }
}