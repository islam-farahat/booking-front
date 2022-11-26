import { BusSelectService } from './../../services/bus-select.service';
import { ITrip } from './../../models/trip.model';
import { TravelRegisterService } from './../../services/travel-register.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICity } from '../../models/city.model';

@Component({
  selector: 'app-available-buses',
  templateUrl: './available-buses.component.html',
  styleUrls: ['./available-buses.component.scss'],
})
export class AvailableBusesComponent implements OnInit {
  date!: Date;
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
    this.date = new Date();
    this.travel.getCity().subscribe((cites) => {
      this.cites = cites;
    });
  }
  select() {
    this.travel.getTrips().subscribe((buses) => {
      this.trips = buses.filter((bus) => {
        console.log(bus.date);

        return (
          bus.from == this.trip.value.from &&
          bus.to == this.trip.value.to &&
          bus.seatsCount > 0
          // bus.date >= this.date
        );
      });
    });
  }

  confirmBus(trip: ITrip) {
    this.busSelect.tripId.next(trip.id!);
  }
}
