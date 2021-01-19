import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Address } from '../address.model';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css'],
})
export class AddressEditComponent implements OnInit {
  loadedAddress: Address;

  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addressService.token();
    const id = this.route.snapshot.paramMap.get('id');
    this.addressService.loadAddressById(id).subscribe((response) => {
      this.loadedAddress = response.endereco;
    });
  }
}
