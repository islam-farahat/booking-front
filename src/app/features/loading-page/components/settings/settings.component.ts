import { ITrip } from './../../models/trip.model';
import { ITicket } from './../../models/ticket.model';
import { Invoice } from './../../models/invoice.model';
import { TravelRegisterService } from './../../services/travel-register.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
@Component({
  selector: 'ticket-cancel-dialog',
  template: `<h1 class="text-center" mat-dialog-title>الغاء الحجز</h1>
    <div mat-dialog-content>
      <p>هل متاكد من الغاء الحجز</p>
    </div>
    <div mat-dialog-actions>
      <button matDialogClose type="button" color="primary" mat-flat-button>
        لا
      </button>
      <button
        (click)="cancel()"
        type="button"
        color="warn"
        mat-flat-button
        cdkFocusInitial
      >
        نعم
      </button>
    </div> `,
})
export class TicketCancelDialog {
  constructor(
    private travel: TravelRegisterService,
    @Inject(MAT_DIALOG_DATA) private data: number
  ) {}
  cancel() {
    this.travel.getInvoiceById(this.data).subscribe((invoice) => {
      this.travel
        .updateInvoice({
          id: invoice.id,
          tripId: invoice.tripId,
          ticketId: invoice.ticketId,
          complete: false,
          date: invoice.date,
        })
        .subscribe({
          next: (value) => {},
          complete: () => {
            window.location.reload();
          },
        });
    });
  }
}
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

  displayedColumns: string[] = ['id', 'price', 'date', 'action'];

  constructor(
    private travel: TravelRegisterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // console.log(this.diffBetweenDates(new Date(), new Date('2023-01-19')));

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
  cancelInvoice(invoiceId: number) {
    this.dialog.open(TicketCancelDialog, { data: invoiceId });
  }
  diffBetweenDates(date1: Date, date2: Date) {
    return moment(date1).diff(moment(date2), 'days');
  }
}
