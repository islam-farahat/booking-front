import { Component, OnInit, ViewChild } from '@angular/core';
import { AvailableBusesComponent } from '../../components/available-buses/available-buses.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('availableBusesComponent', { static: false })
  availableBusesComponent!: AvailableBusesComponent;
  constructor() {}

  ngOnInit(): void {}
}
