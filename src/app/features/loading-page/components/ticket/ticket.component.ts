import { ITicket } from './../../models/ticket.model';
import { TravelRegisterService } from './../../services/travel-register.service';
import { BusSelectService } from './../../services/bus-select.service';
import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as qrcode from 'qrcode';

import html2canvas from 'html2canvas';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  terms: string[] = [];
  chairCount!: number;
  id!: number;
  ticketid!: number;
  ticketId!: number[];
  tickets: ITicket[] = [];
  license!: string;
  mobile!: string;
  city!: string;
  total!: string;
  tripId!: number;
  roomType!: string;

  travelDate!: string;
  travelDay!: string;
  travelTime!: string;

  date = Date();
  qrCodeStr: string;

  constructor(
    private busSelect: BusSelectService,
    private travel: TravelRegisterService
  ) {
    this.qrCodeStr = 'Some string to generate QR Code';
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getTicketId() {
    this.busSelect.ticketId.subscribe((value) => {
      this.ticketId = value;
      this.ticketid = value[0];
    });
  }
  getChairCount() {
    this.busSelect.chairCount.subscribe((value) => {
      this.chairCount = value;
    });
  }
  getTickets() {
    for (let i = 0; i < this.chairCount; i++) {
      this.travel.getTicket(this.ticketId[i]).subscribe((value) => {
        this.tickets.push(value);
      });
    }
  }
  getTripId() {
    this.busSelect.tripId.subscribe((value) => {
      this.tripId = value;
    });
  }
  getTrip() {
    this.travel.getTrip(this.tripId).subscribe((value) => {
      this.city = value.to;
      this.total = value.price;
      this.travelDate = value.date;
      this.travelTime = value.time;
    });
  }
  async ngOnInit() {
    this.travel.getTicketDetailsByName('الكسار').subscribe((value) => {
      this.license = value.license;
      this.mobile = value.mobile;
      this.terms = value.terms.split('-');
    });

    await this.delay(500);
    this.getTicketId();
    await this.delay(500);
    this.getChairCount();
    await this.delay(500);
    this.getTickets();
    await this.delay(500);
    this.getTripId();
    await this.delay(500);
    this.getTrip();
  }

  Convert_HTML_To_PDF() {
    qrcode.toCanvas(document.getElementById('qrcode'), 'islam');
    // let x = q.create('http://jindo.dev.naver.com/collie');

    // new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");
    this.travel
      .addInvoice({ ticketId: this.ticketId, tripId: this.tripId })
      .subscribe((value) => {});

    // let HTML_Width = document.querySelector('#contentToPrint')?.clientWidth;
    // let HTML_Height = document.querySelector('#contentToPrint')?.clientHeight;
    // let top_left_margin = 2;
    // let PDF_Width = HTML_Width! + top_left_margin * 2;
    // let PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
    // let canvas_image_width = HTML_Width;
    // let canvas_image_height = HTML_Height;

    // let totalPDFPages = Math.ceil(HTML_Height! / PDF_Height) - 1;

    // html2canvas(document.getElementById('contentToPrint')!, {
    //   allowTaint: true,
    // }).then(function (canvas) {
    //   canvas.getContext('2d');

    //   console.log(canvas.height + '  ' + canvas.width);

    //   let imgData = canvas.toDataURL('image/jpeg', 1.0);
    //   let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);

    //   pdf.addImage(
    //     imgData,
    //     'JPG',
    //     Number(top_left_margin),
    //     Number(top_left_margin),
    //     Number(canvas_image_width),
    //     Number(canvas_image_height)
    //   );

    //   for (let i = 1; i <= totalPDFPages; i++) {
    //     pdf.addPage(PDF_Width.toString(), 'landscape');
    //     pdf.addImage(
    //       imgData,
    //       'JPG',
    //       Number(top_left_margin),
    //       -(Number(PDF_Height) * Number(i)) + Number(top_left_margin) * 4,
    //       Number(canvas_image_width),
    //       Number(canvas_image_height)
    //     );
    //   }

    //   pdf.output('dataurlnewwindow', { filename: 'ticket' });
    // });

    // var divContents = document.getElementById("GFG").innerHTML;
    // var a = window.open('', '', 'height=500, width=500');
    // a.document.write('<html>');
    // a.document.write('<body > <h1>Div contents are <br>');
    // a.document.write(divContents);
    // a.document.write('</body></html>');
    // a.document.close();
    // a.print();

    let a = window.open('', '', 'height=800, width=800');

    a?.document.write('<html lang="ar" dir="rtl">');

    a?.document.write(` <head>
    <style>
    @media print {
      body {
        width: 100% !important;
        height: 100% !important;
      }
    }
  </style>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    </head>`);

    a?.document.write('<body >');
    a?.document.write(document.getElementById('contentToPrint')?.innerHTML!);
    a?.document.write('</body></html>');
    a?.document.close();
    a?.print();
  }
}
