import { ITicket } from './../../models/ticket.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TravelRegisterService } from '../../services/travel-register.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { utils, writeFile } from 'xlsx';
@Component({
  selector: 'app-bus-info',
  templateUrl: './bus-info.component.html',
  styleUrls: ['./bus-info.component.scss'],
})
export class BusInfoComponent implements OnInit {
  info: ITicket[] = [];
  searchBox = this.fb.group({
    search: [''],
  });
  constructor(private fb: FormBuilder, private travel: TravelRegisterService) {}

  ngOnInit(): void {}
  search() {
    this.info.splice(0);

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
}
