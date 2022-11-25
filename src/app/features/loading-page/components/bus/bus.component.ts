import { TravelRegisterService } from './../../services/travel-register.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Bus } from '../../models/bus.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss'],
})
export class BusComponent implements OnInit {
  buses!: Bus[];

  bus = new FormControl('', [
    Validators.pattern('^[0-9]+$'),
    Validators.required,
  ]);

  constructor(
    private travel: TravelRegisterService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.travel.getBuses().subscribe((buses) => {
      this.buses = buses;
    });
  }
  getErrorMessage() {
    if (this.bus.hasError('required')) {
      return 'You must enter a value';
    }

    return 'Not a valid bus number';
  }
  addBus() {
    if (
      this.buses.find((obj) => {
        return Number(obj.busNum) == Number(this.bus.value);
      }) == undefined
    ) {
      this.travel.addBus({ busNum: this.bus.value! }).subscribe((bus) => {
        this.buses.push(bus!);
        this.snackBar.open('تمت الاضافة بنجاح', 'اغلاق');
      });
    } else {
      this.snackBar.open('الاتوبيس موجود مسبقا', 'اغلاق');
    }
  }
  removeBus(bus: Bus, index: number) {
    this.travel.removeBus(bus.id!).subscribe(() => {
      this.buses.splice(index, 1);
    });
  }
}
