import { InvoicesViewComponent } from './pages/invoices-view/invoices-view.component';
import { AllTripsComponent } from './components/all-trips/all-trips.component';
import { BusInfoComponent } from './components/bus-info/bus-info.component';
import { BillDocumentComponent } from './pages/bill-document/bill-document.component';
import { AuthGuardService } from './../auth/services/auth-guard.service';
import { SettingsComponent } from './components/settings/settings.component';
import { AddComponent } from './pages/add/add.component';
import { LoadingPageComponent } from './loading-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketInfoComponent } from './components/ticket-info/ticket-info.component';

const routes: Routes = [
  {
    path: '',
    component: LoadingPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'bill-document',
    component: BillDocumentComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'bus-info',
    component: BusInfoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'all-trips',
    component: AllTripsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'bill-document',
    component: BillDocumentComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'ticket-info',
    component: TicketInfoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'invoices-view',
    component: InvoicesViewComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingPageRoutingModule {}
