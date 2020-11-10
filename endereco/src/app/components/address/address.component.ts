import { AddressService } from './address.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  token: string;

  constructor(private addressService: AddressService, private router: Router) {}

  ngOnInit(): void {
    this.token = this.recuperarToken();
    this.verificarPossuiToken(this.token);
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
}
