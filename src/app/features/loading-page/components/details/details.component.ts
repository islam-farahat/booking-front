import { ITicketDetails } from './../../models/ticket_details.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  qr = new Image();
  ticketId: number[] = [];
  chairCount!: number;
  details!: FormGroup;
  ticketDetails: ITicketDetails = {
    branchName: '',
    license: '',
    mobile: '',
    vatSerial: '',
    terms: [],
  };
  currentDate!: string;

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
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private busSelect: BusSelectService,
    private travel: TravelRegisterService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
    this.busSelect.chairCount.subscribe((value) => {
      this.chairCount = value;
    });
    moment.locale();
    this.currentDate = moment().format('LL');
    this.details = this.fb.group({
      person: this.fb.array([]),
    });
    for (let i = 0; i < this.chairCount; i++) {
      this.addPerson();
    }
    this.travel.getTicketDetailsByName('الكسار').subscribe({
      next: (value) => {
        this.ticketDetails = value;
      },
      complete: () => { },
    });

    this.awaitTimeout(1000).then(() => {
      this.travel.getTrip(this.tripId.value).subscribe({
        next: (trip: ITrip) => {
          this.trip = trip;
        },
        complete: () => {
          this.travel
            .generateQrCode({
              sellerName: 'الكسار',
              timestamp: new Date().toISOString(),
              total: (Number(this.trip.price) * this.chairCount).toString(),
              vatNumber: this.ticketDetails.vatSerial,
              vatTotal: (
                Number(this.trip.price) *
                this.chairCount *
                0.15
              ).toString(),
            })
            .subscribe((qrcode) => {
              this.qr.src = String(qrcode);
            });
        },
      });
    });
  }

  get person(): FormArray {
    return this.details.get('person') as FormArray;
  }

  newPerson(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      mobile: ['', Validators.required],
      idNumber: ['', Validators.required],
      nationality: ['', Validators.required],
    });
  }
  addPerson() {
    this.person.push(this.newPerson());
  }

  submit() {
    let chairNumber: number[] = [];
    this.busSelect.chairNumber.subscribe((value) => {
      chairNumber = value;
    });
    for (let i = 0; i < this.chairCount; i++) {
      this.travel
        .addTicket({
          fullName: this.details.value['person'][i]['fullName'],
          mobile: String(this.details.value['person'][i]['mobile']),
          nationality: this.details.value['person'][i]['nationality'],
          idNumber: this.details.value['person'][i]['idNumber'],
          busNumber: this.tripId.value,
          chairNumber: chairNumber[i]!,
          complete: true,
        })
        .subscribe({
          error: (e) => { },
          next: (ticket) => {
            this.tickets.push(ticket);
            this.ticketId[i] = ticket.id!;
          },
          complete: () => {
            if (i == this.chairCount - 1) {
              this.awaitTimeout(200).then(() => {
                this.reserve();
              });
            }
          },
        });
    }
  }

  awaitTimeout = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));
  number(value: string) {
    return Number(value);
  }

  reserve() {
    this.travel
      .addInvoice({
        ticketId: this.ticketId,
        tripId: this.tripId.value,
        date: moment(new Date()).format('YYYY-MM-DD'),
        complete: true,
      })
      .subscribe({
        next: (value) => {
          this.id = value.id!;
        },

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

    img.src = 'assets/images/logo.jpg';
    var pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addFont('assets/fonts/Amiri-Regular.ttf', 'Amiri', 'normal');
    pdf.setFont('Amiri');
    pdf.setFontSize(18);



    pdf.text(['الكســـــــــار',
    ], 170, 10, {
      align: 'center',
    });
    pdf.text(['AL-KASSAR',
    ], 40, 10, {
      align: 'center',
    });

    pdf.setFontSize(8);
    pdf.text(['لخدمات العمرة و الزيارة',
      'ترخيص : 120107000100  س ت : 5800021621',
      'هاتف : 0177253157 جوال المكتب : 0559738321',
      'جوال : 0504760563 - 0552836914',
      'الباحة-الشارع العام-مقابل اكسترا'
    ], 170, 15, {
      align: 'center',
    });
    pdf.text(['for Umrah & visit service',
      'licence : 120107000100  c.r. : 5800021621',
      'Tel : 0177253157 Office : 0559738321',
      'Mob : 0504760563 - 0552836914',
      'Al-Baha-Main ST. opp. Extra'
    ], 40, 15, {
      align: 'center',
    });

    pdf.text('فاتورة ضريبية', 105, 6, {
      align: 'center',
    });
    pdf.addImage(img, 'jpg', 92.5, 10, 25, 25);
    autoTable(pdf, {
      margin: { top: 35 },
      theme: 'plain',
      bodyStyles: { font: 'Amiri', halign: 'right' },
      body: [
        [
          this.ticketDetails.mobile,
          'الهاتف',
          this.ticketDetails.license,
          'ترخيص',
        ],
        [this.currentDate, 'التاريخ', this.id, 'رقم التذكرة'],
      ],
    });
    pdf.line(10, 53, 200, 53);

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
          (Number(this.trip.price) * this.chairCount).toString(),
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
    pdf.setFontSize(16);


    let terms = this.ticketDetails.terms.map((str, index) => ({ term: str, id: '-' + (index + 1).toString() }));


    autoTable(pdf, {
      margin: { top: 90 },
      theme: 'plain',

      bodyStyles: { font: 'Amiri', halign: 'right', fontSize: 12 },
      columnStyles: {
        term: { cellWidth: 'auto' },
        id: { cellWidth: 7 },
      },

      body: terms,
      columns: [
        { dataKey: 'term' },
        { dataKey: 'id' },

      ],

    });

    pdf.addImage(this.qr, 'jpg', 160, 230, 40, 40);
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
  }




}
