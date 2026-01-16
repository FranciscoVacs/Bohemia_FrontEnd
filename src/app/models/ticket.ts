import { Purchase } from "./purchase.js";

export interface Ticket {
  id: number;
  qrCode: string;
  numberInPurchase: number;
  numberInTicketType: number;
  purchase?: Purchase;
}
