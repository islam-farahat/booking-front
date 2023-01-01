import { ITicketDetails } from './../../models/ticket_details.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BillDocumentService } from './../../services/bill-document.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TravelRegisterService } from '../../services/travel-register.service';
import * as moment from 'moment';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-bill-document-add',
  templateUrl: './bill-document-add.component.html',
  styleUrls: ['./bill-document-add.component.scss'],
})
export class BillDocumentAddComponent implements OnInit {
  billDocument = this.fb.group({
    date: ['', Validators.required],
    price: [0, Validators.required],
    name: ['', Validators.required],
    count: [0, Validators.required],
    from: ['', Validators.required],
    to: ['', Validators.required],
  });
  ticketDetails: ITicketDetails = {
    license: '',
    mobile: '',
    branchName: '',
    vatSerial: '',
    terms: [],
  };

  constructor(
    private travel: TravelRegisterService,
    private fb: FormBuilder,
    private billDocumentService: BillDocumentService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.travel
      .getTicketDetailsByName('الكسار')
      .subscribe((value: ITicketDetails) => {
        this.ticketDetails = value;
      });
  }

  addBillDocument() {
    this.billDocumentService
      .addBillDocument({
        buscount: this.billDocument.value.count!,
        date: moment(this.billDocument.value.date!).format('YYYY-MM-DD'),
        from: this.billDocument.value.from!,
        fullName: this.billDocument.value.name!,
        price: this.billDocument.value.price!,
        to: this.billDocument.value.to!,
      })
      .subscribe({
        next: (obj) => {},
        error: (error) => {
          this.snackbar.open('فشل الحفظ!', 'اغلاق', { duration: 1500 });
        },
        complete: () => {
          this.snackbar.open('تم الحفظ بنجاح', 'اغلاق', { duration: 1500 });
          this.pdf();
        },
      });
  }

  pdf() {
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
        [moment(this.billDocument.value.date!).format('YYYY-MM-DD'), 'التاريخ'],
        [this.billDocument.value.name!, 'استلمت من المكرم'],
        [this.billDocument.value.price!, 'مبلغ و قدرة'],
        [this.billDocument.value.count!, 'و ذلك اجرة تاجير اتوبيس عدد'],
        [this.billDocument.value.from!, 'من'],
        [this.billDocument.value.to!, 'الي'],
        ['و العودة'],
        [this.billDocument.value.to!, 'من'],
        [this.billDocument.value.from!, 'الي'],
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
