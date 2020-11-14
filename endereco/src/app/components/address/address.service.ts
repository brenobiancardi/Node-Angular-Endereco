import { MessageService } from './../../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Address } from './address.model';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  baseUrl = 'http://localhost:8777/api/endereco';
  httpOptions: any; /*token*/

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loginService: LoginService
  ) {}

  token(): void {
    const userToken = this.loginService.recoverToken();
    this.loginService.verifyToken(userToken);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: userToken,
      }),
    };
  }

  loadAddress(options: any = this.httpOptions): Observable<Address[]> {
    this.httpOptions = options;
    return this.http.get<Address[]>(this.baseUrl, options).pipe(
      map((obj) => obj),
      catchError((e) => {
        return this.messageService.errorHandler(e);
      })
    );
  }

  loadAddressById(
    id: string,
    httpOptions: any = this.httpOptions
  ): Observable<Address> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Address>(url, httpOptions).pipe(
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

  editAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(this.baseUrl, address, this.httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => {
        return this.messageService.errorHandler(e);
      })
    );
  }

  createAddress(address: Address): Observable<Address> {
    return this.http
      .post<Address>(this.baseUrl, address, this.httpOptions)
      .pipe(
        map((obj) => obj),
        catchError((e) => {
          return this.messageService.errorHandler(e);
        })
      );
  }
}
