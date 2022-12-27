import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingPageRoutingModule } from './loading-page-routing.module';
import { LoadingPageComponent } from './loading-page.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { TicketInfoComponent } from './components/ticket-info/ticket-info.component';
import { AvailableBusesComponent } from './components/available-buses/available-buses.component';
import { BookSeatComponent } from './components/book-seat/book-seat.component';
import { DetailsComponent } from './components/details/details.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { AddComponent } from './pages/add/add.component';

import { BusComponent } from './components/bus/bus.component';
import { CityComponent } from './components/city/city.component';
import { TeravalComponent } from './components/teraval/teraval.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BusInfoComponent } from './components/bus-info/bus-info.component';
import { BillDocumentComponent } from './pages/bill-document/bill-document.component';
import { AllTripsComponent } from './components/all-trips/all-trips.component';
import { BillDocumentViewComponent } from './components/bill-document-view/bill-document-view.component';
import { BillDocumentAddComponent } from './components/bill-document-add/bill-document-add.component';

@NgModule({
  declarations: [
    LoadingPageComponent,
    TicketInfoComponent,
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
    BillDocumentComponent,
    AllTripsComponent,
    BillDocumentViewComponent,
    BillDocumentAddComponent,
  ],
  imports: [CommonModule, LoadingPageRoutingModule, AppMaterialModule],
})
export class LoadingPageModule {}
