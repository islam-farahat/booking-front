import { ITicket } from './../../models/ticket.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { TravelRegisterService } from '../../services/travel-register.service';

import { ITrip } from '../../models/trip.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-invoices-view',
  templateUrl: './invoices-view.component.html',
  styleUrls: ['./invoices-view.component.scss'],
})
export class InvoicesViewComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'fullName',
    'nationality',
    'mobile',
    'idNumber',
    'chairNumber',
  ];

  currentDate: string = '';
  terms: string[] = [];
  license: string = '';
  mobile: string = '';

  ticketsView: ITicket[] = [];
  tickets: ITicket[] = [];
  pdfBody: any[] = [{}];
  trip: ITrip = {
    busNumber: '',
    date: '',
    from: '',
    price: '',
    seats: [],
    seatsCount: 0,
    time: '',
    to: '',
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<ITicket>(this.ticketsView);

  constructor(private travel: TravelRegisterService) {
    this.travel.getInvoices().subscribe({
      next: (obj) => {
        obj.forEach((value) => {
          this.travel.getTicket(value.ticketId[0]).subscribe((ticket) => {
            ticket.id = value.id;
            this.ticketsView.push(Object.assign({}, ticket));
          });
        });
      },
      error: () => {},
      complete: () => {
        this.awaitTimeout(200).then(() => {
          this.dataSource = new MatTableDataSource<ITicket>(this.ticketsView);
          this.dataSource.paginator = this.paginator;
        });
      },
    });
  }
  awaitTimeout = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));
  number(value: string) {
    return Number(value);
  }
  print(invoiceId: number) {
    this.travel.getInvoiceById(invoiceId).subscribe({
      next: (invoice) => {
        this.travel.getTrip(invoice.tripId).subscribe((trip: ITrip) => {
          this.trip = trip;
        });
        invoice.ticketId.forEach((ticketId) => {
          this.travel.getTicket(ticketId).subscribe((value) => {
            this.tickets.push(value);
          });
        });
      },
      error: (error) => {},
      complete: () => {
        this.awaitTimeout(200).then(() => {
          this.pdf();
        });
      },
    });
  }
  ngOnInit(): void {
    moment.locale();
    this.currentDate = moment().format('LL');

    this.travel.getTicketDetailsByName('????????????').subscribe((value) => {
      this.license = value.license;
      this.mobile = value.mobile;
      this.terms = value.terms;
    });
  }

  pdf() {
    this.pdfBody = this.tickets;

    var img = new Image();
    var qr =
      'https://chart.googleapis.com/chart?cht=qr&chl=' +
      '????????????' +
      '&chs=160x160&chld=L|0';
    img.src = 'assets/images/logo.jpg';
    var pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addFont('assets/fonts/Amiri-Regular.ttf', 'Amiri', 'normal');
    pdf.setFont('Amiri');
    pdf.setFontSize(18);

    pdf.rect(
      3,
      3,
      pdf.internal.pageSize.width - 6,
      pdf.internal.pageSize.height - 6,
      'S'
    );
    pdf.addImage(img, 'jpg', 10, 5, 25, 25);

    pdf.text('?????????? ??????', 105, 10, {
      align: 'center',
    });
    pdf.text(['????????????', '???????????? ???????????? ?? ??????????????'], 200, 10, {
      align: 'right',
    });
    autoTable(pdf, {
      margin: { top: 30 },
      theme: 'plain',
      bodyStyles: { font: 'Amiri', halign: 'right' },
      body: [
        [this.mobile, '????????????', this.license, '??????????'],
        [this.currentDate, '??????????????', '5', '?????? ??????????????'],
      ],
    });
    pdf.line(10, 50, 200, 50);

    autoTable(pdf, {
      margin: { top: 75 },
      theme: 'striped',
      headStyles: { font: 'Amiri', halign: 'right' },
      bodyStyles: { font: 'Amiri', halign: 'right' },

      columns: [
        { header: '????????????', dataKey: 'chairNumber' },
        { header: '????????????', dataKey: 'mobile' },
        { header: '??????????????', dataKey: 'idNumber' },
        { header: '??????????????', dataKey: 'nationality' },
        { header: '??????????', dataKey: 'fullName' },
      ],
      body: this.pdfBody,
    });

    autoTable(pdf, {
      margin: { top: 90 },
      theme: 'striped',
      headStyles: { font: 'Amiri', halign: 'right' },

      bodyStyles: { font: 'Amiri', halign: 'right' },
      head: [['?????? ????????????', '????????????????', '??????', '????']],

      body: [
        [
          this.trip.id!.toString(),
          (Number(this.trip.price) * this.tickets.length).toString(),
          this.trip.to,
          this.trip.from,
        ],
      ],
    });
    autoTable(pdf, {
      margin: { top: 90 },
      theme: 'striped',
      headStyles: { font: 'Amiri', halign: 'right' },

      bodyStyles: { font: 'Amiri', halign: 'right' },
      head: [['?????? ????????????????', '?????????? ????????????????']],

      body: [[this.trip.time, moment(this.trip.date).format('L')]],
    });
    pdf.line(10, 145, 200, 145);
    pdf.setFontSize(16);
    pdf.text(this.terms, 200, 170, {
      align: 'right',
    });

    pdf.addImage(qr, 'jpg', 160, 200, 40, 40);
    pdf.text('?????????? ?????? ???????? ??????????', 110, 280, { align: 'center' });

    pdf.autoPrint();
    const hiddFrame = document.createElement('iframe');
    hiddFrame.style.position = 'fixed';

    hiddFrame.style.width = '1px';
    hiddFrame.style.height = '1px';
    hiddFrame.style.opacity = '0.01';
    const isSafari = /^((?!chrome|android).)*safari/i.test(
      window.navigator.userAgent
    );
    if (isSafari) {
      // fallback in safari
      hiddFrame.onload = () => {
        try {
          hiddFrame.contentWindow?.document.execCommand(
            'print',
            false,
            undefined
          );
        } catch (e) {
          hiddFrame.contentWindow?.print();
        }
      };
    }
    hiddFrame.src = pdf.output('bloburl').toString();
    document.body.appendChild(hiddFrame);

    this.pdfBody.splice(0, this.pdfBody.length);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
