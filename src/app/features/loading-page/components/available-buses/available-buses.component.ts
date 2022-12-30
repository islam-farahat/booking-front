import { BusSelectService } from './../../services/bus-select.service';
import { ITrip } from './../../models/trip.model';
import { TravelRegisterService } from './../../services/travel-register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICity } from '../../models/city.model';
import * as moment from 'moment';
import { map } from 'rxjs';

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
}
