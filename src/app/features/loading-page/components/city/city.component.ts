import { TravelRegisterService } from './../../services/travel-register.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICity } from '../../models/city.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  city = new FormControl('');

  cites!: ICity[];

  addCity() {
    if (
      this.cites.find((obj) => {
        return obj.cityName == this.city.value;
      }) == undefined
    ) {
      this.travel.addCity({ cityName: this.city.value! }).subscribe((city) => {
        this.cites.push(city!);
      });
    }
  }
  removeCity(city: ICity, index: number) {
    this.travel.removeCity(city.id!).subscribe(() => {
      this.cites.splice(index, 1);
    });
  }
  constructor(private travel: TravelRegisterService) {}
  ngOnInit(): void {
    this.travel.getCity().subscribe((cites) => {
      this.cites = cites;
    });
  }
}
