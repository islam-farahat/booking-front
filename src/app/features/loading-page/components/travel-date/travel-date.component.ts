import { ITrip } from './../../models/trip.model';
import { BusSelectService } from './../../services/bus-select.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICity } from '../../models/city.model';
import { TravelRegisterService } from '../../services/travel-register.service';

@Component({
  selector: 'app-travel-date',
  templateUrl: './travel-date.component.html',
  styleUrls: ['./travel-date.component.scss'],
})
export class TravelDateComponent implements OnInit {
  // x!: ITrip[];
  // cites!: ICity[];
  // trip = this.fb.group({
  //   from: [''],
  //   to: [''],
  //   date: [''],
  // });
  // constructor(
  //   private fb: FormBuilder,
  //   private travel: TravelRegisterService,
  //   private selectBus: BusSelectService
  // ) {}

  ngOnInit(): void {
    // this.travel.getCity().subscribe((cites) => {
    //   this.cites = cites;
    // });
  }
  // select() {
  //   this.selectBus.selectBus(this.trip.value.from!, this.trip.value.to!);
  // }
}
