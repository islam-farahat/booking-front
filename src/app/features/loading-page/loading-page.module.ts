import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingPageRoutingModule } from './loading-page-routing.module';
import { LoadingPageComponent } from './loading-page.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { TravelDateComponent } from './components/travel-date/travel-date.component';
import { AvailableBusesComponent } from './components/available-buses/available-buses.component';
import { BookSeatComponent } from './components/book-seat/book-seat.component';
import { DetailsComponent } from './components/details/details.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { AddComponent } from './pages/add/add.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BusComponent } from './components/bus/bus.component';
import { CityComponent } from './components/city/city.component';
import { TeravalComponent } from './components/teraval/teraval.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BusInfoComponent } from './components/bus-info/bus-info.component';

@NgModule({
  declarations: [
    LoadingPageComponent,
    TravelDateComponent,
    AvailableBusesComponent,
    BookSeatComponent,
    DetailsComponent,
    TicketComponent,
    AddComponent,
    BusComponent,
    CityComponent,
    TeravalComponent,
    SettingsComponent,
    BusInfoComponent,
  ],
  imports: [
    CommonModule,
    LoadingPageRoutingModule,
    AppMaterialModule,
    NgxMaterialTimepickerModule.setLocale('ar-AE'),
  ],
})
export class LoadingPageModule {}
