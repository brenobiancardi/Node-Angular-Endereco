import { MessageService } from './../../message.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Address } from './address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  baseUrl = 'http://localhost:8777/api/endereco';
  httpOptions: any; /*token*/

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  loadAddress(options: any): Observable<Address[]> {
    this.httpOptions = options;
    return this.http.get<Address[]>(this.baseUrl, options).pipe(
      map((obj) => obj),
      catchError((e) => {
        return this.messageService.errorHandler(e);
      })
    );
  }

  loadAddressById(id: string): Observable<Address> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Address>(url, this.httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => {
        return this.messageService.errorHandler(e);
      })
    );
  }
  deleteAddress(id: number): Observable<Address> {
    const url = `${this.baseUrl}?id=${id}`;
    return this.http.delete<Address>(url, this.httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => {
        return this.messageService.errorHandler(e);
      })
    );
  }
}
