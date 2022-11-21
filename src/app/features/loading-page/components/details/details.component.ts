import { TravelRegisterService } from './../../services/travel-register.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BusSelectService } from '../../services/bus-select.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  ticketId: number[] = [];

  ngOnInit(): void {
    this.details = this.fb.group({
      person: this.fb.array([]),
    });
    this.busSelect.chairCount.subscribe((value) => {
      this.chairCount = value;
    });
    for (let i = 0; i < this.chairCount; i++) {
      this.addPerson();
    }
  }

  get person(): FormArray {
    return this.details.get('person') as FormArray;
  }

  newPerson(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      mobile: ['', Validators.required],
      idNumber: ['', Validators.required],
      nationality: ['', Validators.required],
    });
  }
  addPerson() {
    this.person.push(this.newPerson());
  }

  chairCount!: number;

  details!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private busSelect: BusSelectService,
    private travel: TravelRegisterService
  ) {}
  submit() {
    let busId: number;
    let chairNumber: number[] = [];
    this.busSelect.busId.subscribe((value) => {
      busId = value;
    });
    this.busSelect.chairNumber.subscribe((value) => {
      chairNumber = value;
    });
    for (let i = 0; i < this.chairCount; i++) {
      this.travel
        .addTicket({
          fullName: this.details.value['person'][i]['fullName'],
          mobile: this.details.value['person'][i]['mobile'],
          nationality: this.details.value['person'][i]['nationality'],
          idNumber: this.details.value['person'][i]['idNumber'],
          busNumber: busId!,
          chairNumber: chairNumber[i]!,
        })
        .subscribe((ticket) => {
          this.ticketId[i] = ticket.id!;
        });
    }
    this.busSelect.ticketId.next(this.ticketId);
  }
}
