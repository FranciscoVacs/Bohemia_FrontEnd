import { Dj } from "./dj.js";
import { TicketType } from "./ticket-type.js";
import { Location } from "./location.js";

export interface Event {
    id: number;
    eventName: string;           
    beginDatetime: string;       
    finishDatetime: string;      
    eventDescription: string;    
    minAge: number;              
    coverPhoto: string;
    ticketsOnSale: number;         
    location?: Location;
    dj?: Dj;
    ticketTypes?: TicketType[];
}