import { AbstractControl, ValidatorFn } from '@angular/forms';

export function formUfValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value === 'AA'
      ? { formUfValidator: { invalid: true } }
      : null;
  };
}
