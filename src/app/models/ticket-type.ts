import { Event } from "./event.js";

export interface TicketType {
  id: number;
  ticketTypeName: string;
  beginDatetime: string;
  finishDatetime: string;
  price: number;
  maxQuantity: number;
  availableTickets: number;
  event?: Event;
}
