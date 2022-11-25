import { TravelRegisterService } from './../../services/travel-register.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ICity } from '../../models/city.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  city = new FormControl('', [Validators.required]);

  cites!: ICity[];
  getErrorMessage() {
    if (this.city.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
  addCity() {
    if (
      this.cites.find((obj) => {
        return obj.cityName == this.city.value;
      }) == undefined
    ) {
      this.travel.addCity({ cityName: this.city.value! }).subscribe((city) => {
        this.cites.push(city!);
        this.snackBar.open('تمت الاضافة بنجاح', 'اغلاق');
      });
    } else {
      this.snackBar.open('اسم المدينة موجود مسبقا', 'اغلاق');
    }
  }
  removeCity(city: ICity, index: number) {
    this.travel.removeCity(city.id!).subscribe(() => {
      this.cites.splice(index, 1);
    });
  }
  constructor(
    private travel: TravelRegisterService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.travel.getCity().subscribe((cites) => {
      this.cites = cites;
    });
  }
}
