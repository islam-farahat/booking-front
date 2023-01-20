import { Invoice } from './../../models/invoice.model';
import { ITicket } from './../../models/ticket.model';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { TravelRegisterService } from '../../services/travel-register.service';

import { ITrip } from '../../models/trip.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITicketDetails } from '../../models/ticket_details.model';

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
          next: (value) => {
            value.ticketId.forEach((id) => {
              this.travel.getTicket(id).subscribe({
                next: (ticket) => {
                  this.travel.getTrip(invoice.tripId).subscribe({
                    next: (trip) => {
                      trip.seats[ticket.chairNumber] = false;
                      this.travel
                        .updateTrip({
                          id: trip.id,
                          busNumber: trip.busNumber,
                          date: trip.date,
                          from: trip.from,
                          to: trip.to,
                          price: trip.price,
                          seatsCount: trip.seatsCount + 1,
                          time: trip.time,
                          seats: trip.seats,
                        })
                        .subscribe();
                    },
                    complete: () => {
                      window.location.reload();
                    },
                  });
                  this.travel
                    .updateTicket({
                      id: ticket.id,
                      fullName: ticket.fullName,
                      idNumber: ticket.idNumber,
                      busNumber: ticket.busNumber,
                      date: ticket.date,
                      chairNumber: ticket.chairNumber,
                      mobile: ticket.mobile,
                      complete: false,
                      nationality: ticket.nationality,
                    })
                    .subscribe({
                      complete: () => {},
                    });
                },
              });
            });
          },
          complete: () => {},
        });
    });
  }
}

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
    'date',
    'action',
    'chairNumber',
  ];

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
  Invoice!: Invoice;
  qr = new Image();
  ticketDetails!: ITicketDetails;

  constructor(
    private travel: TravelRegisterService,
    private dialog: MatDialog
  ) {
    this.travel.getInvoices().subscribe({
      next: (obj) => {
        obj.forEach((value) => {
          this.travel.getTicket(value.ticketId[0]).subscribe((ticket) => {
            ticket.id = value.id;
            ticket.date = value.date;

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
        this.Invoice = invoice;
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
        this.travel
          .generateQrCode({
            sellerName: 'الكسار',
            timestamp: new Date().toISOString(),
            total: Number(this.trip.price).toString(),
            vatNumber: this.ticketDetails.vatSerial,
            vatTotal: (Number(this.trip.price) * 0.15).toString(),
          })
          .subscribe((qrcode) => {
            this.qr.src = String(qrcode);
          });

        this.awaitTimeout(200).then(() => {
          this.pdf();
        });
      },
    });
  }
  ngOnInit(): void {
    this.travel.getTicketDetailsByName('الكسار').subscribe({
      next: (value) => {
        this.ticketDetails = value;
      },
      complete: () => {},
    });
    moment.locale();

    this.travel.getTicketDetailsByName('الكسار').subscribe((value) => {
      this.license = value.license;
      this.mobile = value.mobile;
      this.terms = value.terms;
    });
  }

  pdf() {
    this.pdfBody = this.tickets;

    var img = new Image();

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

    pdf.text('تذكرة سفر', 105, 10, {
      align: 'center',
    });
    // pdf.text(['الكسار', 'لخدمات العمرة و الزيارة'], 200, 10, {
    //   align: 'right',
    // });
    autoTable(pdf, {
      margin: { top: 30 },
      theme: 'plain',
      bodyStyles: { font: 'Amiri', halign: 'right' },
      body: [
        [this.mobile, 'الهاتف', this.license, 'ترخيص'],
        [
          moment(this.Invoice.date).format('LL'),
          'التاريخ',
          this.Invoice.id!,
          'رقم التذكرة',
        ],
      ],
    });
    pdf.line(10, 50, 200, 50);

    autoTable(pdf, {
      margin: { top: 75 },
      theme: 'striped',
      headStyles: { font: 'Amiri', halign: 'right' },
      bodyStyles: { font: 'Amiri', halign: 'right' },

      columns: [
        { header: 'المقعد', dataKey: 'chairNumber' },
        { header: 'الهاتف', dataKey: 'mobile' },
        { header: 'الاقامة', dataKey: 'idNumber' },
        { header: 'الجنسية', dataKey: 'nationality' },
        { header: 'الاسم', dataKey: 'fullName' },
      ],
      body: this.pdfBody,
    });

    autoTable(pdf, {
      margin: { top: 90 },
      theme: 'striped',
      headStyles: { font: 'Amiri', halign: 'right' },

      bodyStyles: { font: 'Amiri', halign: 'right' },
      head: [['رقم الرحلة', 'الاجمالي', 'الي', 'من']],

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
      head: [['وقت المغادرة', 'تاريخ المغادرة']],

      body: [[this.trip.time, moment(this.trip.date).format('L')]],
    });
    pdf.line(10, 145, 200, 145);
    pdf.setFontSize(16);
    pdf.text(this.terms, 200, 170, {
      align: 'right',
    });

    pdf.addImage(this.qr, 'jpg', 160, 200, 40, 40);
    pdf.text('نتمني لكم رحلة سعيدة', 110, 280, { align: 'center' });

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

  cancelInvoice(invoiceId: number) {
    this.dialog.open(TicketCancelDialog, { data: invoiceId });
  }
  diffBetweenDates(date1: Date, date2: Date) {
    return moment(date1).diff(moment(date2), 'days');
  }
}
