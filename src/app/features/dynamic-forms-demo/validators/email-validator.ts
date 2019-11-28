import { FormControl } from '@angular/forms';

const EMAIL_REGEX = new RegExp('[a-zA-Z0-9_\.\-]@(gmail|walla|hotmail|microsoft|dxc)\.(com|co\.il|gov\.il|net|org)');

export function validateEmail(c: FormControl) {
    return EMAIL_REGEX.test(c.value) ? null : {
        validateEmail: {
            valid: false
        }
    };
}