import { BusSelectService } from './../../services/bus-select.service';
import { ITrip } from './../../models/trip.model';
import { TravelRegisterService } from './../../services/travel-register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICity } from '../../models/city.model';
import * as moment from 'moment';
import { map } from 'rxjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-available-buses',
  templateUrl: './available-buses.component.html',
  styleUrls: ['./available-buses.component.scss'],
})
export class AvailableBusesComponent implements OnInit {
  isTrip: boolean = false;
  trips: ITrip[] = [];
  cites!: ICity[];
  trip = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private travel: TravelRegisterService,
    private busSelect: BusSelectService
  ) {}

  ngOnInit(): void {
    this.travel.getCity().subscribe((cites) => {
      this.cites = cites;
    });
  }
  select() {
    this.travel
      .findTripByTodyDate(moment(new Date()).format('YYYY-MM-DD'))
      .pipe(
        map((buses) =>
          buses.filter(
            (bus) =>
              bus.from == this.trip.value.from &&
              bus.to == this.trip.value.to &&
              bus.seatsCount > 0
          )
        )
      )
      .subscribe({
        next: (buses) => {
          this.trips = buses;
        },
        error: (error) => {},
        complete: () => {
          this.isTrip = this.trips.length > 0 ? false : true;
        },
      });
  }

  confirmBus(trip: ITrip) {
    this.busSelect.tripId.next(trip.id!);
  }
  // pdf() {
  //   var img = new Image();
  //   var qr =
  //     'https://chart.googleapis.com/chart?cht=qr&chl=' +
  //     'الكسار' +
  //     '&chs=160x160&chld=L|0';
  //   img.src = 'assets/images/logo.jpg';
  //   var pdf = new jsPDF('p', 'mm', 'a4');
  //   pdf.addFont('assets/fonts/Amiri-Regular.ttf', 'Amiri', 'normal');
  //   pdf.setFont('Amiri');
  //   pdf.setFontSize(18);

  //   pdf.rect(
  //     3,
  //     3,
  //     pdf.internal.pageSize.width - 6,
  //     pdf.internal.pageSize.height - 6,
  //     'S'
  //   );
  //   pdf.addImage(img, 'jpg', 10, 5, 25, 25);

  //   pdf.text('تذكرة سفر', 105, 10, {
  //     align: 'center',
  //   });
  //   pdf.text(['الكسار', 'لخدمات العمرة و الزيارة'], 200, 10, {
  //     align: 'right',
  //   });
  //   autoTable(pdf, {
  //     margin: { top: 30 },
  //     theme: 'plain',
  //     bodyStyles: { font: 'Amiri', halign: 'right' },
  //     body: [
  //       ['012548214', 'الهاتف', '124822', 'ترخيص'],
  //       ['22-10-2022', 'التاريخ', '5', 'رقم التذكرة'],
  //     ],
  //   });
  //   pdf.line(10, 50, 200, 50);

  //   autoTable(pdf, {
  //     margin: { top: 75 },
  //     theme: 'striped',
  //     headStyles: { font: 'Amiri', halign: 'right' },
  //     bodyStyles: { font: 'Amiri', halign: 'right' },
  //     head: [['المقعد', 'الهاتف', 'الاقامة', 'الجنسية', 'الاسم']],
  //     body: [
  //       ['5', '012348657', '88432356', 'مصر', 'اسلام'],
  //       ['3', '012347857', '88432476', 'مصر', 'احمد'],
  //       ['2', '012342757', '88272476', 'مصر', 'محمد'],
  //       ['6', '012348657', '88432444', 'مصر', 'حامد'],
  //       ['7', '012348657', '88432476', 'مصر', 'اسلام'],
  //     ],
  //   });
  //   autoTable(pdf, {
  //     margin: { top: 90 },
  //     theme: 'striped',
  //     headStyles: { font: 'Amiri', halign: 'right' },

  //     bodyStyles: { font: 'Amiri', halign: 'right' },
  //     head: [['رقم الرحلة', 'الاجمالي', 'اتجاة الرحلة']],

  //     body: [['5', '6000', 'جدة']],
  //   });
  //   autoTable(pdf, {
  //     margin: { top: 90 },
  //     theme: 'striped',
  //     headStyles: { font: 'Amiri', halign: 'right' },

  //     bodyStyles: { font: 'Amiri', halign: 'right' },
  //     head: [['وقت المغادرة', 'تاريخ المغادرة']],

  //     body: [['6 AM', '20-5-2023']],
  //   });
  //   pdf.line(10, 145, 200, 145);
  //   pdf.setFontSize(16);
  //   pdf.text(
  //     [
  //       ' الحضور قبل الموعد بساعة-',
  //       ' عدم اصطحاب الحيونات الاليفة-',
  //       ' برجاء المحافظة علي نظافة الاتوبيس-',
  //     ],
  //     200,
  //     170,
  //     {
  //       align: 'right',
  //     }
  //   );

  //   pdf.addImage(qr, 'jpg', 160, 200, 40, 40);
  //   pdf.text('نتمني لكم رحلة سعيدة', 110, 280, { align: 'center' });

  //   pdf.autoPrint();
  //   const blob = pdf.output('bloburl');
  //   window.open(blob);
  // }
}
