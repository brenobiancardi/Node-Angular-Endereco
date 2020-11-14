import { MessageService } from './../../../message.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Address } from '../../address/address.model';
import { AddressService } from './../../address/address.service';
import { UfModel } from './uf.model';
import { estados } from './uf.data.json';
import { formUfValidator } from './form.directive';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  addressForm;
  address: Address;

  @Input() data: Address;
  @Input() typeForm: string;

  ufData: UfModel[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private addressService: AddressService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.ufData = estados;
    if (this.typeForm === 'Novo') {
      this.addressForm = this.formBuilder.group({
        tpLogr: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
        logradouro: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
        bairro: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        cidade: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        uf: new FormControl('AA', [
          Validators.required,
          Validators.minLength(2),
          formUfValidator(),
        ]),
        createdAt: '',
        updatedAt: '',
      });
    } else {
      this.addressForm = this.formBuilder.group(this.data);
    }
  }

  onSubmit(dadosEndereco: Address): void {
    if (this.typeForm === 'Editando') {
      this.addressService.editAddress(dadosEndereco).subscribe((address) => {
        this.addressForm = this.formBuilder.group(address);
        this.messageService.showMessage('Endereco atualizado.');
        this.router.navigate(['/address']);
      });
    } else if (this.typeForm === 'Novo') {
      this.addressService.createAddress(dadosEndereco).subscribe((address) => {
        this.addressForm = this.formBuilder.group(address);
        this.messageService.showMessage('Endereco adicionado.');
        this.router.navigate(['/address']);
      });
    }
  }
  cancel(): void {
    this.router.navigate(['/address']);
  }
}
