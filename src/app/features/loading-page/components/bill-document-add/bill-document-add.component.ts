import { ITicketDetails } from './../../models/ticket_details.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BillDocumentService } from './../../services/bill-document.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TravelRegisterService } from '../../services/travel-register.service';
import * as moment from 'moment';
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
          this.print();
        },
      });
  }

  print() {
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
