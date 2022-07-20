/**
 * Group model
 */
export class Group {

    /**
     * Constructor
     * @param id Group id
     * @param groupName Group name
     */
    constructor(id: number, groupName: string) {
        this.id = id;
        this.groupName = groupName;
    }

    /** Group id */
    public id: number;

    /** Group name */
    public groupName: string;
}
