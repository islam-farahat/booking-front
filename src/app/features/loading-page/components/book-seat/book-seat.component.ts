import { TravelRegisterService } from './../../services/travel-register.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { BusSelectService } from '../../services/bus-select.service';
import { MatSnackBar } from '@angular/material/snack-bar';

class Room {
  roomType!: string;
  roomsCount!: string;
}
@Component({
  selector: 'app-book-seat',
  templateUrl: './book-seat.component.html',
  styleUrls: ['./book-seat.component.scss'],
})
export class BookSeatComponent implements OnInit {
  disabled: boolean = true;
  rooms: Room[] = [];
  room = this.fb.group({
    roomType: [''],
    roomsCount: [''],
  });
  id: number = 0;
  color: boolean[] = [];
  chairCount: number = 0;
  bookedChair: number[] = [];

  btnDisable = new FormControl(false);
  disableSelect = new FormControl(false);
  constructor(
    private fb: FormBuilder,
    private travel: TravelRegisterService,
    private busSelect: BusSelectService,
    readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.busSelect.tripId.subscribe((value) => {
      this.id = value;
    });

    this.travel.getTrip(this.id!).subscribe((trip) => {
      this.color = trip.seats;
      if (trip.seatsCount == 47) {
        this.color[48] = true;
        this.color[49] = true;
      }
    });
  }
  bookRoom() {
    this.rooms.push({
      roomsCount: this.room.value.roomsCount!,
      roomType: this.room.value.roomType!,
    });
  }

  bookChair(value: number) {
    if (this.chairCount == 0) {
      this.disabled = false;
    }
    if (this.chairCount >= 5 && !this.color[value]) {
      this.snackBar.open('الحد الاقصي للحجز 5 مقاعد', 'اغلاق', {
        duration: 2000,
      });
    } else {
      if (!this.color[value]) {
        this.bookedChair.push(value);
        this.color[value] = true;
        this.chairCount++;
      } else {
        this.snackBar.open('المقعد محجوز', 'اغلاق', { duration: 2000 });
      }
    }
  }
  sub(num1: number, num2: number) {
    return num1 - num2;
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  confirm() {
    this.busSelect.chairCount.next(this.chairCount);
    this.busSelect.chairNumber.next(this.bookedChair);

    this.travel.getTrip(this.id!).subscribe(async (t) => {
      t.seats = this.color;
      await this.delay(500);
      t.seatsCount = this.sub(t.seatsCount, this.chairCount);
      await this.delay(500);

      this.travel.updateTrip(t!).subscribe(async (trip) => {});
    });
  }
  removeChair(value: number) {
    const index = this.bookedChair.indexOf(value);
    if (index !== -1) {
      this.bookedChair.splice(index, 1);
      this.color[value] = false;
      this.chairCount--;
    }
    if (this.chairCount == 0) {
      this.disabled = true;
    }
  }
}
