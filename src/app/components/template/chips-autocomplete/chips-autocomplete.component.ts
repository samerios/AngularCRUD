import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SelectConfig } from 'src/app/models/select-config';
import { HelperService } from 'src/app/services/helper.service';

/** Chips autocomplete component for select multi values
 *  Inputs: label of input, inputPlaceholder, values of auto complete,
 *  selectedValues, autocompleteConfig contains value and view value names
 *  Outputs: selectedValuesChange when delete and add value
 */
@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.css']
})
export class ChipsAutocompleteComponent implements OnInit {

  /** Autocomplete label */
  @Input() label!: string;

  /** Input placeholder name */
  @Input() inputPlaceholder!: string;

  /** All values of autocomplete (input) */
  @Input() values!: any[];

  /** Selected autocomplete values (selected ids) */
  @Input() selectedValues: any[] = [];

  /** Autocomplete config (value and view value) */
  @Input() autocompleteConfig!: SelectConfig;

  /** Selected autocomplete values change event (output) for bind with parent component */
  @Output() selectedValuesChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  /** Autocomplete input value reference for get control on the input  */
  @ViewChild('valueInput') valueInput!: ElementRef<HTMLInputElement>;

  /** Separator keys code in autocomplete input when input event */
  separatorKeysCodes: number[] = [ENTER, COMMA];

  /** value control for use in input to get the input value */
  valueCtrl = new FormControl('');

  /** Filtered values observable string array (for save filtered values when user input) */
  filteredValues!: Observable<any[]>;

  /**
   * Constructor
   * @param helper Helper service for use helper functions
   */
  constructor(private helper: HelperService) { }

  ngOnInit(): void {

    /**
     * Store filtered values in the filteredValues
     * for show them in auto complete each time when user input text
     * call to filter when user input a value else show all values in values array
     */
    this.filteredValues = this.valueCtrl.valueChanges.pipe(
      startWith(null),
      map((value: any | null) => (value ? this._filter(value) : this.values.slice())),
    );
  }

  /**
   *  When user enter input function
   *  check if the input is part of the autocomplete options
   *  not exist in the selectedValues array
   * @param event Chip input event contains the input
   */
  add(event: MatChipInputEvent): void {

    // Remove spaces from value
    const value = (event.value || '').trim();

    // Get array of view for all values 
    let viewValuesNames: string[] = this.helper.getStringArrayValues(this.autocompleteConfig.viewValue, this.values);

    // Get array of view for selected values 
    let selectedViewValuesNames: string[] = this.helper.getStringArrayValues(this.autocompleteConfig.viewValue, this.selectedValues);

    // Add our value in selectedValues and invoke event emit 
    // if the value is part of values and not exist in the selectedValues array
    if (value && viewValuesNames.includes(value) && !selectedViewValuesNames.includes(value)) {
      let valueToAdd = this.helper.getObjectByElementSearch(this.autocompleteConfig.viewValue, value, this.values);
      this.selectedValues.push(valueToAdd);
      this.selectedValuesChange.emit(this.selectedValues);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.valueCtrl.setValue(null);
  }

  /**
   * Remove value from chips input update selectedValues array and invoke event emit
   * @param value Object contains chip input to remove
   */
  remove(value: any): void {

    // Get selected values ids array
    let selectedValuesIds: string[] = this.helper.getStringArrayValues(this.autocompleteConfig.value, this.selectedValues);

    // Get index of the value for remove
    const index = selectedValuesIds.indexOf(value[this.autocompleteConfig.value]);

    // Remove value from selectedValues array and invoke event emit
    if (index >= 0) {
      this.selectedValues.splice(index, 1);
      this.selectedValuesChange.emit(this.selectedValues);
    }
  }

  /**
   * Selected autocomplete option changed
   * @param event Autocomplete selected event (when select option)
   */
  selected(event: MatAutocompleteSelectedEvent): void {

    // Get list of view values array for selected values
    let selectedValuesIds: string[] = this.helper.getStringArrayValues(this.autocompleteConfig.value, this.selectedValues);

    // Only if the value not already selected then add him to the selected values list
    if (!selectedValuesIds.includes(event.option.value[this.autocompleteConfig.value])) {
      this.selectedValues.push(event.option.value);
      this.valueInput.nativeElement.value = '';
      this.valueCtrl.setValue(null);
    }
  }

  /**
   * Filter values when user input text
   * @param value input/object value 
   * @returns Filtered values object
   */
  private _filter(value: any): any[] {

    // Variable to store view value
    let filterValue: any;
    let valueType = typeof (value);

    // Input text case
    if (valueType === 'string') {
      filterValue = value.toLowerCase();
    }
    // Option changed case
    else {
      filterValue = value[this.autocompleteConfig.viewValue].toLowerCase();
    }

    // Get array of view values of all values
    let viewValuesNames: string[] = this.helper.getStringArrayValues(this.autocompleteConfig.viewValue, this.values);

    // Get array of view values that include the filter value
    let viewFilteredValues = viewValuesNames.filter(valueInArray => valueInArray.toLowerCase().includes(filterValue));

    // Variable for save filtered values objects to return them
    let filteredValues: any[] = [];

    // Iterate viewFilteredValues and save objects in filteredValues
    viewFilteredValues.forEach(element => {
      let value = this.helper.getObjectByElementSearch(this.autocompleteConfig.viewValue, element, this.values);
      filteredValues.push(value);
    });

    return filteredValues;
  }
}
