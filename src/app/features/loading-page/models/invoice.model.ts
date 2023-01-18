export interface Invoice {
  id?: number;
  ticketId: number[];
  tripId: number;
  complete?: boolean;
  date: string;
}
