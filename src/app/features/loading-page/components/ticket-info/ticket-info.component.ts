import { TravelRegisterService } from './../../services/travel-register.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss'],
})
export class TicketInfoComponent implements OnInit {
  ticketDetails = this.fb.group({
    license: [''],
    mobile: [''],
    terms: [''],
  });
  constructor(private fb: FormBuilder, private travel: TravelRegisterService) {}

  ngOnInit(): void {
    this.travel.getTicketDetailsByName('الكسار').subscribe((value) => {
      if (value) {
        this.ticketDetails.setValue({
          license: value.license,
          mobile: value.mobile,
          terms: value.terms,
        });
      } else {
        this.travel
          .addTicketDetails({
            branchName: 'الكسار',
            license: '000',
            mobile: '000',
            terms: '000',
          })
          .subscribe((value) => {
            this.ticketDetails.setValue({
              license: value.license,
              mobile: value.mobile,
              terms: value.terms,
            });
          });
      }
    });
  }

  submit() {
    this.travel
      .updateTicketDetails({
        branchName: 'الكسار',
        license: this.ticketDetails.value.license!,
        mobile: this.ticketDetails.value.mobile!,
        terms: this.ticketDetails.value.terms!,
      })
      .subscribe((value) => {
        this.ticketDetails.setValue({
          license: value.license,
          mobile: value.mobile,
          terms: value.terms,
        });
      });
  }
}
