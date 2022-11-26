import { Component, OnInit } from '@angular/core';
import { ITrip } from '../../models/trip.model';
import { TravelRegisterService } from '../../services/travel-register.service';

@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.scss'],
})
export class AllTripsComponent implements OnInit {
  trips: ITrip[] = [];
  constructor(private travel: TravelRegisterService) {}

  ngOnInit(): void {
    this.travel.getTrips().subscribe((buses) => {
      this.trips = buses;
    });
  }
}
