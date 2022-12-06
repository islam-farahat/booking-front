import { ITrip } from './../../models/trip.model';
import { ITicket } from './../../models/ticket.model';
import { Invoice } from './../../models/invoice.model';
import { TravelRegisterService } from './../../services/travel-register.service';
import { FormBuilder } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  total: number = 0;
  dataSource: any;
  invoices: Invoice[] = [];
  tickets: ITicket[] = [];
  trips: ITrip[] = [];

  displayedColumns: string[] = ['id', 'price', 'date'];

  ticketDetails = this.fb.group({
    license: [''],
    mobile: [''],
    terms: [''],
  });
  constructor(private fb: FormBuilder, private travel: TravelRegisterService) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.travel.getTicketDetailsByName('الكسار').subscribe((value) => {
      if (value) {
        this.ticketDetails.setValue({
          license: value.license,
          mobile: value.mobile,
          terms: value.terms,
        });
      } else {
        this.travel
          .addTicketDetails({
            branchName: 'الكسار',
            license: '000',
            mobile: '000',
            terms: '000',
          })
          .subscribe((value) => {
            this.ticketDetails.setValue({
              license: value.license,
              mobile: value.mobile,
              terms: value.terms,
            });
          });
      }
    });
    this.travel.getInvoices().subscribe((value) => {
      value.forEach((obj) => {
        this.travel.getTrip(obj.tripId).subscribe((trip) => {
          this.total += obj.ticketId.length * Number(trip.price);
          trip.id = obj.id;
          trip.price = (Number(trip.price) * obj.ticketId.length).toString();

          this.trips.push(Object.assign({}, trip));
        });
      });
    });
    this.dataSource = new MatTableDataSource<ITrip>(this.trips);
  }

  submit() {
    this.travel
      .updateTicketDetails({
        branchName: 'الكسار',
        license: this.ticketDetails.value.license!,
        mobile: this.ticketDetails.value.mobile!,
        terms: this.ticketDetails.value.terms!,
      })
      .subscribe((value) => {
        this.ticketDetails.setValue({
          license: value.license,
          mobile: value.mobile,
          terms: value.terms,
        });
      });
  }
}
