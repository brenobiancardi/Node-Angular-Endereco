import { MessageService } from './../../../message.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Address } from '../../address/address.model';
import { AddressService } from './../../address/address.service';
import { UfModel } from './uf.model';
import { estados } from './uf.data.json';

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
    private addressService: AddressService,
    private messageService: MessageService
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

  onSubmit(dadosEndereco: Address): void {
    if (this.typeForm === 'Editando') {
      this.addressService.editAddress(dadosEndereco).subscribe((address) => {
        this.address = this.formBuilder.group(address);
        this.messageService.showMessage('Endereco atualizado.');
        this.router.navigate(['/address']);
      });
    } else if (this.typeForm === 'Novo') {
      console.log('novo registro');
    }
  }
  cancel(): void {
    this.router.navigate(['/address']);
  }
}
