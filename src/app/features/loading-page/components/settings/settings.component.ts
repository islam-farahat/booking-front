import { LoginComponent } from './../../../auth/pages/login/login.component';
import { ITrip } from './../../models/trip.model';
import { ITicket } from './../../models/ticket.model';
import { Invoice } from './../../models/invoice.model';
import { TravelRegisterService } from './../../services/travel-register.service';
import { FormBuilder } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  invoices: Invoice[] = [];
  tickets: ITicket[] = [];
  trips: ITrip[] = [];
  dataSource!: any;
  displayedColumns: string[] = ['id', 'price', 'date'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ticketDetails = this.fb.group({
    license: [''],
    mobile: [''],
    terms: [''],
  });
  constructor(private fb: FormBuilder, private travel: TravelRegisterService) {
    this.dataSource = new MatTableDataSource<ITrip>(this.trips);
    this.getInvoices();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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
  }
  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.dataSource.paginator = this.paginator;
  }
  getInvoices() {
    this.travel.getInvoices().subscribe((value) => {
      value.forEach((obj) => {
        this.travel.getTrip(obj.tripId).subscribe((trip) => {
          trip.id = obj.id;
          this.trips.push(Object.assign({}, trip));
        });
      });
    });
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
