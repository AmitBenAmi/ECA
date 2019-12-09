export interface Validator {
    name: string;
    validator: any;
    message: string;
}

export interface FieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    options?: string[];
    type: FieldType;
    value?: any;
    validations?: Validator[];
    disabled?: boolean;
    subFields?: Array<FieldConfig>;
}

export enum FieldType {
    input,
    button,
    select,
    date,
    radio,
    checkbox,
    group
}