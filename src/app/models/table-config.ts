import { TableColumnConfig } from "./table-column-config";

/**
 * Table config model use in table component
 */
export class TableConfig {

    /**
     * Constructor
     * @param data Table data (array of objects)
     * @param tableColumnConfig Table columns config array
     * @param primaryKeyColumn Primary key column name, by default is id
     * @param deletable Is table deletable?
     * @param editable Is table editable?
     */
    constructor(data: any[],
        tableColumnConfig: TableColumnConfig[],
        primaryKeyColumn?: string,
        deletable?: boolean,
        editable?: boolean) {
        this.data = data;
        this.tableColumnConfig = tableColumnConfig;
        this.primaryKeyColumn = primaryKeyColumn;
        this.deletable = deletable;
        this.editable = editable;
    }

    /** Table data */
    data: any[];

    /** Table columns config */
    tableColumnConfig: TableColumnConfig[];

    /** Primary key column by default is id */
    primaryKeyColumn?: string = "id";

    /** Is table deletble? */
    deletable?: boolean = false;

    /** Is table editable? */
    editable?: boolean = false;
}
