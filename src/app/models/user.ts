import { City } from "./city";
import { Group } from "./group";

/** User model contains user data */
export class User {

    /**
     * Constructor
     * @param firstName First name
     * @param lastName Last name
     * @param email Email
     * @param phoneNumber Phone number
     * @param address Address
     * @param gender Gender
     * @param city City
     * @param groups Groups array
     */
    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: number,
        address: string,
        gender: string,
        city?: City,
        groups?: Group[],
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.gender = gender;
        this.city = city;
        this.groups = groups;
    }

    /** Id (auto increment) */
    public id!: number;

    /** First name */
    public firstName: string;

    /** Last name */
    public lastName: string;

    /** Email address */
    public email: string;

    /** Phone number */
    public phoneNumber: number;

    /** Address */
    public address: string;

    /** Gender */
    public gender: string;

    /** City */
    public city?: City;

    /** Groups array */
    public groups?: Group[];
}
