import { ITicket } from './../../models/ticket.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TravelRegisterService } from '../../services/travel-register.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { utils, writeFile } from 'xlsx';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ITicketDetails } from '../../models/ticket_details.model';
@Component({
  selector: 'app-bus-info',
  templateUrl: './bus-info.component.html',
  styleUrls: ['./bus-info.component.scss'],
})
export class BusInfoComponent implements OnInit {
  ticketDetails: ITicketDetails = {
    branchName: '',
    license: '',
    mobile: '',
    vatSerial: '',
    terms: [],
  };
  info: ITicket[] = [];
  printInfo: any[] = [{}];
  searchBox = this.fb.group({
    search: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private travel: TravelRegisterService) {}

  ngOnInit(): void {
    this.travel.getTicketDetailsByName('الكسار').subscribe({
      next: (value) => {
        this.ticketDetails = value;
      },
      complete: () => {},
    });
  }
  infoIsEmpty() {
    return this.info.length > 0;
  }
  search() {
    this.info.splice(0);
    this.travel.getInvoices().subscribe((value) => {
      console.log(value);
    });

    this.travel
      .getTicketsByBusId(Number(this.searchBox.value.search))
      .subscribe((search) => {
        search.forEach((value) => {
          this.info.push(Object.assign({}, value));
        });
        this.dataSource.paginator = this.paginator;
      });
  }

  displayedColumns: string[] = [
    'id',
    'fullName',
    'nationality',
    'mobile',
    'idNumber',
    'chairNumber',
  ];
  dataSource = new MatTableDataSource<ITicket>(this.info);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  print() {
    let wb = utils.table_to_book(document.getElementById('busInfo'));
    /* Export to file (start a download) */
    writeFile(wb, 'SheetJSTable.xlsx');
  }
  pdf() {
    this.printInfo = this.info;
    var img = new Image();

    img.src = 'assets/images/logo.jpg';
    var pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addFont('assets/fonts/Amiri-Regular.ttf', 'Amiri', 'normal');
    pdf.setFont('Amiri');
    pdf.setFontSize(18);

    pdf.addImage(img, 'jpg', 10, 5, 25, 25);

    pdf.text('كشف الركاب', 105, 10, {
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
      headStyles: { font: 'Amiri', halign: 'right', fontSize: 15 },
      bodyStyles: { font: 'Amiri', halign: 'right', fontSize: 15 },
      columns: [
        { header: 'المقعد', dataKey: 'chairNumber' },
        { header: 'الهاتف', dataKey: 'mobile' },
        { header: 'الاقامة', dataKey: 'idNumber' },
        { header: 'الجنسية', dataKey: 'nationality' },
        { header: 'الاسم', dataKey: 'fullName' },
      ],
      body: this.printInfo,
    });

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
    this.printInfo.splice(0, this.printInfo.length);
  }
}
