import { City } from "./city.js";

export interface Location {
    id?: number;
    locationName: string;
    address: string;
    maxCapacity: number;
    city: City;
}
