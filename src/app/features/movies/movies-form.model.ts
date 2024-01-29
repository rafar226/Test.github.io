import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

export interface MoviesFormModel {
  title?: string;
  year?: number;
  type?: number;
  id?: number;
}

export interface MoviesControls {
  title: AbstractControl | null;
  year: AbstractControl | null;
  type: AbstractControl | null;
  id: AbstractControl | null;
}

export class MoviesFormHelper {
  static createForm(fb: FormBuilder, detail?: MoviesFormModel) {
    return fb.group({
      title: [detail ? detail.title : null],
      year: [detail ? detail.year : null],
      type: [detail ? detail.type : null],
      id: [detail ? detail.id : null]
    });
  }

  static buildFormValues(form: FormGroup): MoviesControls {
    return {
      title: form.get('title'),
      year: form.get('year'),
      type: form.get('type'),
      id: form.get('id')
    };
  }

  static getFormModel(form: FormGroup): MoviesFormModel | null {
    if (form.valid) return form.getRawValue() as MoviesFormModel;
    else return null;
  }

  static clearForm(form: FormGroup) {
    form.reset();
  }
}
