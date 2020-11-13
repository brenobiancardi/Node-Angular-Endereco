import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';

// Angular material pra agilizar
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddressReadComponent } from './components/address/address-read/address-read.component';
import { CardsComponent } from './components/template/cards/cards.component';
import { AddressEditComponent } from './components/address/address-edit/address-edit.component';
import { FormComponent } from './components/template/form/form.component';
import { AddressCreateComponent } from './components/address/address-create/address-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    AddressReadComponent,
    CardsComponent,
    AddressEditComponent,
    FormComponent,
    AddressCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
