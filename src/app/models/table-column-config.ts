import { SelectConfig } from "./select-config";

/**
 * Table column config model use in table component
 */
export class TableColumnConfig {

    /**
     * Constructor
     * @param name Column name (Name in data)
     * @param displayName Column display name
     * @param selectConfig Select config, use if column consists of ke and value
     */
    constructor(name: string,
        displayName: string,
        selectConfig?: SelectConfig) {
        this.name = name;
        this.displayName = displayName;
        this.selectConfig = selectConfig;
    }

    /** Column Data Name */
    name: string;

    /** Column display name */
    displayName: string;

    /** Select config use when the column Consists of select or autocomplete */
    selectConfig?: SelectConfig;
}
