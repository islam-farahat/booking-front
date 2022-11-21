import { Bus } from './../../models/bus.model';
import { ICity } from './../../models/city.model';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TravelRegisterService } from '../../services/travel-register.service';

@Component({
  selector: 'app-teraval',
  templateUrl: './teraval.component.html',
  styleUrls: ['./teraval.component.scss'],
})
export class TeravalComponent implements OnInit {
  trip = this.fb.group({
    from: [''],
    to: [''],
    date: [''],
    time: [''],
    price: [''],
    busNumber: [''],
    seatsCount: [''],
  });
  seats: boolean[] = [];
  cites!: ICity[];
  buses!: Bus[];
  seatsCount: Number[] = [49, 48];
  constructor(private fb: FormBuilder, private travel: TravelRegisterService) {}
  addTrip() {
    let date = this.trip.value.date?.toString()?.split('00:00:00');

    this.travel
      .addTrip({
        from: this.trip.value.from!,
        to: this.trip.value.to!,
        date: date![0],
        time: this.trip.value.time!,
        price: this.trip.value.price!,
        busNumber: this.trip.value.busNumber!,
        seatsCount: Number(this.trip.value.seatsCount!),
        seats: this.seats,
      })
      .subscribe(() => {});
  }
  removeTrip() {}
  ngOnInit(): void {
    for (let i = 0; i <= 50; i++) {
      this.seats[i] = false;
    }
    this.travel.getCity().subscribe((cites) => {
      this.cites = cites;
    });
    this.travel.getBuses().subscribe((buses) => {
      this.buses = buses;
    });
  }
}
