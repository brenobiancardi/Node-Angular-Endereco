import { AddressService } from './../../address/address.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../address/address.model';
import { UfModel } from './uf.model';
import { estados } from './uf.data.json';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  address;

  @Input() data: Address;
  @Input() typeForm: string;

  ufData: UfModel[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.ufData = estados;
    if (this.typeForm === 'Novo') {
      this.address = this.formBuilder.group({
        id: 0,
        tpLogr: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: 'AA',
        createdAt: '',
        updatedAt: '',
      });
    } else {
      this.address = this.formBuilder.group(this.data);
    }
  }

  onSubmit(dadosEndereco): void {
    console.log(dadosEndereco);
    this.addressService.editAddress(dadosEndereco).subscribe((address) => {
      this.address = address;
    });
  }
  cancel(): void {
    this.router.navigate(['/address']);
  }
}
