/**
 * Table column select config model
 * use for show select column that contains key and value
 */
export class SelectConfig {

    /**
     * Constructor
     * @param value Value f,or example id
     * @param viewValue View value, the value will be displayed
     */
    constructor(value: string, viewValue: string) {
        this.value = value;
        this.viewValue = viewValue;
    }

    // Value
    value: string;

    // View value
    viewValue: string;
}
