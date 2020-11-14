import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Address } from './address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  baseUrl = 'http://localhost:8777/api/endereco';
  httpOptions: any; /*token*/

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage(e.error.erro, true);

    return EMPTY;
  }

  loadAddress(options: any): Observable<Address[]> {
    this.httpOptions = options;
    return this.http.get<Address[]>(this.baseUrl, options).pipe(
      map((obj) => obj),
      catchError((e) => {
        return this.errorHandler(e);
      })
    );
  }

  loadAddressById(id: string): Observable<Address> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Address>(url, this.httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => {
        return this.errorHandler(e);
      })
    );
  }
  deleteAddress(id: number): Observable<Address> {
    const url = `${this.baseUrl}?id=${id}`;
    return this.http.delete<Address>(url, this.httpOptions).pipe(
      map((obj) => obj),
      catchError((e) => {
        return this.errorHandler(e);
      })
    );
  }
}
