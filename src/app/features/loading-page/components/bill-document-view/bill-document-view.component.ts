import { BillDocumentModel } from './../../models/bill-document.model';
import { BillDocumentService } from './../../services/bill-document.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-bill-document-view',
  templateUrl: './bill-document-view.component.html',
  styleUrls: ['./bill-document-view.component.scss'],
})
export class BillDocumentViewComponent implements OnInit {
  billDocumentDataSource: BillDocumentModel[] = [];
  billDocument = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private billDocumentService: BillDocumentService
  ) {}

  ngOnInit(): void {
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
}
