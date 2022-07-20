import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/** Helper service contain helper methods */
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  /**
   * Add error to form control
   * @param errors Error to add in control
   * @param control Control
   * @returns 
   */
  public addErrors(errors: { [key: string]: any }, control: AbstractControl) {
    if (!control || !errors) {
      return;
    }

    control.setErrors({ ...control.errors, ...errors });
  }

  /**
   * Get string array of values by send key and object data for search
   * @param key Key
   * @param data Data for search
   * @returns String array=of values
   */
  getStringArrayValues(key: string, data: any[]): string[] {

    let viewValuesName: string[] = [];
    data.forEach(element => {
      viewValuesName.push(element[key]);
    });

    return viewValuesName;
  }

  /**
   * Get object that equals to view value by send key viewValue and which data to search
   * @param key Key
   * @param viewValue View value
   * @param data Data
   * @returns Object
   */
  getObjectByElementSearch(key: string, viewValue: any, data: any[]): any {

    let value;

    data.forEach(element => {
      if (element[key] == viewValue) {
        value = element;
      }
    });
    return value;
  }
}
