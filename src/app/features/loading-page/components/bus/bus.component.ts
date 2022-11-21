import { TravelRegisterService } from './../../services/travel-register.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Bus } from '../../models/bus.model';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss'],
})
export class BusComponent implements OnInit {
  buses!: Bus[];

  bus = new FormControl('');

  constructor(private travel: TravelRegisterService) {}
  ngOnInit(): void {
    this.travel.getBuses().subscribe((buses) => {
      this.buses = buses;
    });
  }
  addBus() {
    if (
      this.buses.find((obj) => {
        return Number(obj.busNum) == Number(this.bus.value);
      }) == undefined
    ) {
      this.travel.addBus({ busNum: this.bus.value! }).subscribe((bus) => {
        this.buses.push(bus!);
      });
    }
  }
  removeBus(bus: Bus, index: number) {
    this.travel.removeBus(bus.id!).subscribe(() => {
      this.buses.splice(index, 1);
    });
  }
}
