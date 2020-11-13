import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private addressService: AddressService, private router: Router) {}

  ngOnInit(): void {
    const userToken = this.recuperarToken();
    this.verificarPossuiToken(userToken);
    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: userToken,
      }),
    };
    this.addressService.carregarEnderecos(httpOptions).subscribe((address) => {
      this.loadedAddress = address;
    });
  }

  recuperarToken(): string {
    const token = localStorage.getItem('Token');
    return token;
  }

  verificarPossuiToken(token: string): void {
    if (token) {
      return;
    } else {
      this.addressService.showMessage('Token invalido, realize o login!', true);
      this.router.navigate(['/login']);
    }
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
