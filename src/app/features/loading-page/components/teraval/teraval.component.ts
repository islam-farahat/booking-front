import { Bus } from './../../models/bus.model';
import { ICity } from './../../models/city.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TravelRegisterService } from '../../services/travel-register.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-teraval',
  templateUrl: './teraval.component.html',
  styleUrls: ['./teraval.component.scss'],
})
export class TeravalComponent implements OnInit {
  trip = this.fb.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    busNumber: ['', [Validators.required]],
    seatsCount: ['', [Validators.required]],
  });
  seats: boolean[] = [];
  cites!: ICity[];
  buses!: Bus[];
  seatsCount: Number[] = [49, 47];
  constructor(
    private fb: FormBuilder,
    private travel: TravelRegisterService,
    private snackBar: MatSnackBar
  ) {}
  getErrorMessage() {
    if (this.trip.controls['from'].hasError('required'))
      return 'You must enter a value';
    if (this.trip.controls['to'].hasError('required'))
      return 'You must enter a value';
    if (this.trip.controls['date'].hasError('required'))
      return 'You must enter a value';
    if (this.trip.controls['time'].hasError('required'))
      return 'You must enter a value';
    if (this.trip.controls['price'].hasError('required'))
      return 'You must enter a value';
    if (this.trip.controls['busNumber'].hasError('required'))
      return 'You must enter a value';
    if (this.trip.controls['seatsCount'].hasError('required'))
      return 'You must enter a value';

    return '';
  }
  getPriceErrorMessage() {
    if (this.trip.controls['price'].hasError('required'))
      return 'You must enter a value';
    else;
    return 'Not a valid number';
  }
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
      .subscribe(() => {
        this.snackBar.open('تمت الاضافة بنجاح', 'اغلاق');
      });
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
