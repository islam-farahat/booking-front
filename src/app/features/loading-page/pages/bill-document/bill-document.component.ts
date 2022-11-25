import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-document',
  templateUrl: './bill-document.component.html',
  styleUrls: ['./bill-document.component.scss'],
})
export class BillDocumentComponent implements OnInit {
  date: string = '';
  price: string = '';
  name: string = '';
  count: string = '';
  from: string = '';
  to: string = '';

  constructor() {}

  ngOnInit(): void {}

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
