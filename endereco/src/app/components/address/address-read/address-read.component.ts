import { LoginService } from './../../login/login.service';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { EventEmitterCard } from '../../template/cards/event-emitter-card';

import { Address } from '../address.model';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-read',
  templateUrl: './address-read.component.html',
  styleUrls: ['./address-read.component.css'],
})
export class AddressReadComponent implements OnInit {
  loadedAddress: Address[];

  constructor(
    private addressService: AddressService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const userToken = this.loginService.recoverToken();
    this.loginService.verifyToken(userToken);
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: userToken,
      }),
    };
    this.addressService.loadAddress(httpOptions).subscribe((address) => {
      this.loadedAddress = address;
    });
  }

  removeItem(itemEvent: EventEmitterCard): void {
    if (itemEvent.deletado) {
      this.loadedAddress.map((item) => {
        if (item.id === itemEvent.id) {
          this.loadedAddress.splice(this.loadedAddress.indexOf(item), 1);
        }
      });
    }
  }
}
