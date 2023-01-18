import { ITrip } from './../../models/trip.model';
import { ITicket } from './../../models/ticket.model';
import { Invoice } from './../../models/invoice.model';
import { TravelRegisterService } from './../../services/travel-register.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  total: number = 0;
  throwback: number = 0;
  dataSource: any;
  invoices: Invoice[] = [];
  tickets: ITicket[] = [];
  trips: ITrip[] = [];

  displayedColumns: string[] = ['id', 'price', 'date'];

  constructor(private travel: TravelRegisterService) {}

  ngOnInit(): void {
    this.getInvoices();
  }
  getInvoices() {
    this.travel.getInvoices().subscribe((value) => {
      value.forEach((obj) => {
        this.travel.getTrip(obj.tripId).subscribe((trip) => {
          if (obj.complete == true) {
            this.total += obj.ticketId.length * Number(trip.price);
          } else {
            this.throwback += obj.ticketId.length * Number(trip.price);
          }

          trip.id = obj.id;
          trip.complete = obj.complete;
          trip.price = (Number(trip.price) * obj.ticketId.length).toString();

          this.trips.push(Object.assign({}, trip));
        });
      });
    });
    this.dataSource = new MatTableDataSource<ITrip>(this.trips);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
