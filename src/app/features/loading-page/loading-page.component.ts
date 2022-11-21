import { AvailableBusesComponent } from './components/available-buses/available-buses.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss'],
})
export class LoadingPageComponent {
  @ViewChild('availableBusesComponent', { static: false })
  availableBusesComponent!: AvailableBusesComponent;
}
