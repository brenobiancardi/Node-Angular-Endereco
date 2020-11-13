import { Component, OnInit } from '@angular/core';
import { Address } from '../address.model';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css'],
})
export class AddressCreateComponent implements OnInit {
  createdAddress: Address;
  constructor() {}

  ngOnInit(): void {}
}
