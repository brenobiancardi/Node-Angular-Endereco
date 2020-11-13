import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressCreateComponent } from './components/address/address-create/address-create.component';
import { AddressEditComponent } from './components/address/address-edit/address-edit.component';
import { AddressReadComponent } from './components/address/address-read/address-read.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'address', component: AddressReadComponent },
  { path: 'address/edit/:id', component: AddressEditComponent },
  { path: 'address/create', component: AddressCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
