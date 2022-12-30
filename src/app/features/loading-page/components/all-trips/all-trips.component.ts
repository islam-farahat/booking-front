import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ITrip } from '../../models/trip.model';
import { TravelRegisterService } from '../../services/travel-register.service';

@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.scss'],
})
export class AllTripsComponent implements OnInit {
  trips: ITrip[] = [];
  constructor(private travel: TravelRegisterService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.travel.getTrips().subscribe((buses) => {
      this.trips = buses;
    });
  }
  day(day: string) {
    return moment(day).format('dddd');
  }

  billDocument = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
  });

  filterBillDocument() {
    this.trips.splice(0);
    this.travel
      .findTripByDate(
        moment(this.billDocument.value.from!).format('YYYY-MM-DD'),
        moment(this.billDocument.value.to!).format('YYYY-MM-DD')
      )
      .subscribe((obj) => {
        this.trips = obj;
      });
  }
}
