export interface Invoice {
  id?: number;
  ticketId: number[];
  tripId: number;
  complete?: boolean;
  date: string;
  roomType?: string;
  roomCost?: number;
  roomCount?: number;
}
