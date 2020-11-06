import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  /*
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "address",
    component: AddressCrudComponent,
  },
  {
    path: "address/create",
    component: AddressCreateComponent,
  },
  {
    path: "address/update/:id",
    component: AddressUpdateComponent,
  },
  {
    path: "address/delete/:id",
    component: AddressDeleteComponent,
  },*/
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
