/**
 * City model
 */
export class City {

    /**
     * Constructor
     * @param id City id
     * @param name City name
     */
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    /** City id */
    public id: number;

    /** City name */
    public name: string;
}
