import { ITrip } from './../../models/trip.model';
import { BehaviorSubject } from 'rxjs';
import { ITicket } from './../../models/ticket.model';
import { TravelRegisterService } from './../../services/travel-register.service';
import { BusSelectService } from './../../services/bus-select.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  qr =
    'https://chart.googleapis.com/chart?cht=qr&chl=Hello+World&chs=160x160&chld=L|0';
  currentDate = new Date();
  terms: string[] = [];
  license!: string;
  mobile!: string;

  chairCount: BehaviorSubject<number> = this.busSelect.chairCount;
  ticketsId: BehaviorSubject<number[]> = this.busSelect.ticketId;
  tripId: BehaviorSubject<number> = this.busSelect.tripId;
  tickets: ITicket[] = [];
  trip!: ITrip;

  constructor(
    private busSelect: BusSelectService,
    private travel: TravelRegisterService
  ) {}
  awaitTimeout = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));
  number(value: string) {
    return Number(value);
  }

  ngOnInit() {
    this.awaitTimeout(1000).then(() => {
      this.travel.getTrip(this.tripId.value).subscribe((trip: ITrip) => {
        this.trip = trip;
      });
    });

    this.awaitTimeout(1000).then(() => {
      this.busSelect.ticketId.subscribe((obj) => {
        obj.forEach((id) => {
          this.travel.getTicket(id).subscribe((value) => {
            this.tickets.push(value);
          });
        });
      });
    });

    this.qr =
      'https://chart.googleapis.com/chart?cht=qr&chl=' +
      'الكسار' +
      '&chs=160x160&chld=L|0';
    this.travel.getTicketDetailsByName('الكسار').subscribe((value) => {
      this.license = value.license;
      this.mobile = value.mobile;
      this.terms = value.terms.split('-');
    });
  }

  Convert_HTML_To_PDF() {
    this.travel
      .addInvoice({ ticketId: this.ticketsId.value, tripId: this.tripId.value })
      .subscribe((value) => {});

    let page = window.open('', '', 'height=800, width=800');

    if (page != null) {
      page.document.write(
        `
        <html lang="ar" dir="rtl"> 
        <head>
            <style>
                @media print {
                    body {
                        width: 100% !important;
                        height: 100% !important;
                        }
                              }
            </style>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"/>
        </head>
        <body>
                    ` +
          document.getElementById('contentToPrint')?.innerHTML! +
          '</body></html>'
      );

      page.document.close();
      page.print();
    }
    console.log(page);
  }
}
