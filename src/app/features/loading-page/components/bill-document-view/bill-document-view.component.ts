import { BillDocumentModel } from './../../models/bill-document.model';
import { BillDocumentService } from './../../services/bill-document.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { TravelRegisterService } from '../../services/travel-register.service';
import { ITicketDetails } from '../../models/ticket_details.model';
import { first, take } from 'rxjs';

@Component({
  selector: 'app-bill-document-view',
  templateUrl: './bill-document-view.component.html',
  styleUrls: ['./bill-document-view.component.scss'],
})
export class BillDocumentViewComponent implements OnInit {
  ticketDetails: ITicketDetails = {
    license: '',
    mobile: '',
    branchName: '',
    vatSerial: '',
    terms: [],
  };
  billDocumentDataSource: BillDocumentModel[] = [];
  printDataSource: BillDocumentModel[] = [];
  billDocument = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private billDocumentService: BillDocumentService,
    private travel: TravelRegisterService
  ) {}

  ngOnInit(): void {
    this.travel
      .getTicketDetailsByName('الكسار')
      .subscribe((value: ITicketDetails) => {
        this.ticketDetails = value;
      });
    this.billDocumentService.findAll().subscribe({
      next: (obj) => {
        this.billDocumentDataSource = obj;
      },
    });
  }
  filterBillDocument() {
    this.billDocumentDataSource.splice(0);
    this.billDocumentService
      .findByDate(
        moment(this.billDocument.value.from!).format('YYYY-MM-DD'),
        moment(this.billDocument.value.to!).format('YYYY-MM-DD')
      )
      .subscribe((obj) => {
        this.billDocumentDataSource = obj;
      });
  }
  pdf(id: number) {
    this.printDataSource = this.billDocumentDataSource.filter((obj) => {
      return obj.id == id;
    });

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

    pdf.text('سند قبض', 105, 10, {
      align: 'center',
    });
    pdf.text(['الكسار', 'لخدمات العمرة و الزيارة'], 200, 10, {
      align: 'right',
    });
    autoTable(pdf, {
      margin: { top: 30 },
      theme: 'plain',
      bodyStyles: { font: 'Amiri', halign: 'right', fontSize: 15 },
      body: [
        [
          this.ticketDetails.mobile,
          'الهاتف',
          this.ticketDetails.license,
          'ترخيص',
        ],
      ],
    });

    pdf.line(10, 45, 200, 45);
    pdf.text('بسم الله الرحمن الرحيم', 110, 60, { align: 'center' });

    pdf.setFontSize(16);

    autoTable(pdf, {
      startY: 70,

      theme: 'striped',
      bodyStyles: { font: 'Amiri', halign: 'right', fontSize: 16 },
      body: [
        [moment(this.printDataSource[0].date).format('YYYY-MM-DD'), 'التاريخ'],
        [this.printDataSource[0].fullName, 'استلمت من المكرم'],
        [this.printDataSource[0].price, 'مبلغ و قدرة'],
        [this.printDataSource[0].buscount, 'و ذلك اجرة تاجير اتوبيس عدد'],
        [this.printDataSource[0].from, 'من'],
        [this.printDataSource[0].to, 'الي'],
        ['و العودة'],
        [this.printDataSource[0].to, 'من'],
        [this.printDataSource[0].from, 'الي'],
      ],
    });
    pdf.text('الختم', 170, 190, { align: 'right' });
    pdf.text('المستلم', 40, 190, { align: 'left' });

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
