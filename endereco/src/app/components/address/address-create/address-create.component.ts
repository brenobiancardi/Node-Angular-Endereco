import { Component, OnInit } from '@angular/core';
import { Address } from '../address.model';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css'],
})
export class AddressCreateComponent implements OnInit {
  createdAddress: Address;
  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService.token();
  }
}
