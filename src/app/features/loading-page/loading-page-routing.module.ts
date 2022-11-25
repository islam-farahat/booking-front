import { BillDocumentComponent } from './pages/bill-document/bill-document.component';
import { AuthGuardService } from './../auth/services/auth-guard.service';
import { SettingsComponent } from './components/settings/settings.component';
import { AddComponent } from './pages/add/add.component';
import { LoadingPageComponent } from './loading-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingPageRoutingModule {}
