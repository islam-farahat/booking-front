import { ITrip } from './../models/trip.model';
import { TravelRegisterService } from './travel-register.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusSelectService {
  tripId = new BehaviorSubject(0);
  chairCount = new BehaviorSubject(0);
  chairNumber = new BehaviorSubject([0]);
  ticketId = new BehaviorSubject([0]);
}
