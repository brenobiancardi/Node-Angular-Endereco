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

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService.token();
    this.addressService.loadAddress().subscribe((address) => {
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
