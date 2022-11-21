export interface ITrip {
  from: string;
  to: string;
  date: string;
  time: string;
  price: string;
  busNumber: string;
  seatsCount: number;
  seats: boolean[];
  id?: number;
}
