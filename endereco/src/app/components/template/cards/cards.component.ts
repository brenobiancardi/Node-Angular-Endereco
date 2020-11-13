import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AddressService } from './../../address/address.service';
import { Address } from './../../address/address.model';
import { EventEmitterCard } from './event-emitter-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  constructor(private addresService: AddressService, private router: Router) {}

  @Input() inputAddress: Address;

  @Output() deletedItemEvent = new EventEmitter<EventEmitterCard>();

  ngOnInit(): void {}

  deleteAddress(id: number): void {
    this.addresService.deleteEndereco(id).subscribe(() => {
      this.addresService.showMessage('Produto excluido com sucesso.');
      this.deletedItemEvent.emit({ id, deletado: true });
    });
  }

  editAddress(address: Address): void {
    this.router.navigate([`/address/edit/${address.id}`]);
  }
}