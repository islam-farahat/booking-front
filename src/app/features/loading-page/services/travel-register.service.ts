import { Invoice } from './../models/invoice.model';
import { ITicketDetails } from './../models/ticket_details.model';
import { ITicket } from './../models/ticket.model';
import { ITrip } from './../models/trip.model';
import { ICity } from './../models/city.model';
import { environment } from './../../../../environments/environment';
import { Bus } from './../models/bus.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TravelRegisterService {
  constructor(private http: HttpClient) {}
  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${environment.API_URL}/buses`);
  }
  getBus(id: number): Observable<Bus> {
    return this.http.get<Bus>(`${environment.API_URL}/buses/${id}`);
  }
  addBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(`${environment.API_URL}/buses`, bus);
  }

  removeBus(id: number) {
    return this.http.delete(`${environment.API_URL}/buses/${id}`);
  }

  addCity(city: ICity): Observable<ICity> {
    return this.http.post<ICity>(`${environment.API_URL}/city`, city);
  }
  removeCity(id: number) {
    return this.http.delete(`${environment.API_URL}/city/${id}`);
  }
  getCity(): Observable<ICity[]> {
    return this.http.get<ICity[]>(`${environment.API_URL}/city`);
  }

  getTrips(): Observable<ITrip[]> {
    return this.http.get<ITrip[]>(`${environment.API_URL}/trip`);
  }
  getTrip(id: number): Observable<ITrip> {
    return this.http.get<ITrip>(`${environment.API_URL}/trip/${id}`);
  }
  addTrip(trip: ITrip): Observable<ITrip> {
    return this.http.post<ITrip>(`${environment.API_URL}/trip`, trip);
  }
  updateTrip(trip: ITrip): Observable<ITrip> {
    return this.http.put<ITrip>(`${environment.API_URL}/trip/${trip.id}`, trip);
  }

  removeTrip() {}

  addTicket(ticket: ITicket): Observable<ITicket> {
    return this.http.post<ITicket>(`${environment.API_URL}/ticket`, ticket);
  }

  getTicket(ticketId: number): Observable<ITicket> {
    return this.http.get<ITicket>(`${environment.API_URL}/ticket/${ticketId}`);
  }

  addTicketDetails(ticketDetails: ITicketDetails): Observable<ITicketDetails> {
    return this.http.post<ITicketDetails>(
      `${environment.API_URL}/ticket-details`,
      ticketDetails
    );
  }
  updateTicketDetails(
    ticketDetails: ITicketDetails
  ): Observable<ITicketDetails> {
    return this.http.put<ITicketDetails>(
      `${environment.API_URL}/ticket-details/${ticketDetails.branchName}`,
      ticketDetails
    );
  }
  getTicketDetailsByName(id: string): Observable<ITicketDetails> {
    return this.http.get<ITicketDetails>(
      `${environment.API_URL}/ticket-details/${id}`
    );
  }
  getTicketsDetails(): Observable<ITicketDetails[]> {
    return this.http.get<ITicketDetails[]>(
      `${environment.API_URL}/ticket-details`
    );
  }

  getTicketsByBusId(busId: number): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(
      `${environment.API_URL}/ticket/info/${busId}`
    );
  }
  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${environment.API_URL}/invoice`, invoice);
  }
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${environment.API_URL}/invoice`);
  }
}
