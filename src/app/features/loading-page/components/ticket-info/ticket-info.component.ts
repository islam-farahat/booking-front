import { TravelRegisterService } from './../../services/travel-register.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss'],
})
export class TicketInfoComponent implements OnInit {
  ticketDetails = this.fb.group({
    license: ['', Validators.required],
    mobile: ['', Validators.required],
    vatNumber: ['', Validators.required],
  });

  terms: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];

  constructor(private fb: FormBuilder, private travel: TravelRegisterService) {}

  ngOnInit() {
    this.travel.getTicketDetailsByName('الكسار').subscribe((value) => {
      if (value) {
        this.ticketDetails.setValue({
          license: value.license,
          mobile: value.mobile,
          vatNumber: value.vatSerial,
        });
        this.terms = value.terms;
      } else {
        this.travel
          .addTicketDetails({
            branchName: 'الكسار',
            license: '000',
            mobile: '000',
            vatSerial: '000',
            terms: ['000'],
          })
          .subscribe((value) => {
            this.ticketDetails.setValue({
              license: value.license,
              mobile: value.mobile,
              vatNumber: value.vatSerial,
            });
            this.terms = value.terms;
          });
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.terms.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(term: string): void {
    const index = this.terms.indexOf(term);
    if (index >= 0) {
      this.terms.splice(index, 1);
    }
  }

  submit() {
    this.travel
      .updateTicketDetails({
        branchName: 'الكسار',
        license: this.ticketDetails.value.license!,
        mobile: this.ticketDetails.value.mobile!,
        vatSerial: this.ticketDetails.value.vatNumber!,
        terms: this.terms,
      })
      .subscribe((value) => {
        this.ticketDetails.setValue({
          license: value.license,
          mobile: value.mobile,
          vatNumber: value.vatSerial,
        });
        this.terms = value.terms;
      });
  }
}
