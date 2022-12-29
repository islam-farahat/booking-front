import { MatSnackBar } from '@angular/material/snack-bar';
import { ITrip } from './../../models/trip.model';
import { BehaviorSubject } from 'rxjs';
import { ITicket } from './../../models/ticket.model';
import { TravelRegisterService } from './../../services/travel-register.service';
import { BusSelectService } from './../../services/bus-select.service';
import { Component, OnInit } from '@angular/core';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import * as moment from 'moment';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  qr =
    'https://chart.googleapis.com/chart?cht=qr&chl=Hello+World&chs=160x160&chld=L|0';
  currentDate!: string;
  terms: string[] = [];
  license!: string;
  mobile!: string;

  chairCount: BehaviorSubject<number> = this.busSelect.chairCount;
  ticketsId: BehaviorSubject<number[]> = this.busSelect.ticketId;
  tripId: BehaviorSubject<number> = this.busSelect.tripId;
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

  constructor(
    private busSelect: BusSelectService,
    private travel: TravelRegisterService,
    private snackBar: MatSnackBar
  ) {}
  awaitTimeout = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));
  number(value: string) {
    return Number(value);
  }

  ngOnInit() {
    moment.locale();
    this.currentDate = moment().format('LL');
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

  reserve() {
    this.travel
      .addInvoice({ ticketId: this.ticketsId.value, tripId: this.tripId.value })
      .subscribe({
        complete: () => {
          this.pdf();
        },
        error: (error) => {
          this.snackBar.open('فشل حجز الرحلة', '', { duration: 1500 });
        },
      });
  }

  pdf() {
    this.pdfBody = this.tickets;
    var img = new Image();
    var qr =
      'https://chart.googleapis.com/chart?cht=qr&chl=' +
      'الكسار' +
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

    pdf.text('تذكرة سفر', 105, 10, {
      align: 'center',
    });
    pdf.text(['الكسار', 'لخدمات العمرة و الزيارة'], 200, 10, {
      align: 'right',
    });
    autoTable(pdf, {
      margin: { top: 30 },
      theme: 'plain',
      bodyStyles: { font: 'Amiri', halign: 'right' },
      body: [
        [this.mobile, 'الهاتف', this.license, 'ترخيص'],
        [this.currentDate, 'التاريخ', '5', 'رقم التذكرة'],
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
      head: [['رقم الرحلة', 'الاجمالي', 'اتجاة الرحلة']],

      body: [
        [
          this.trip.id!.toString(),
          (Number(this.trip.price) * this.chairCount.value).toString(),
          this.trip.to,
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

    pdf.addImage(qr, 'jpg', 160, 200, 40, 40);
    pdf.text('نتمني لكم رحلة سعيدة', 110, 280, { align: 'center' });

    pdf.autoPrint();
    const blob = pdf.output('bloburl');
    window.open(blob);
  }
}
