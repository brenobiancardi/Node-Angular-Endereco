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

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage(e.error, true);
    console.log(e);

    return EMPTY;
  }

  carregarEnderecos(options: any): Observable<Address[]> {
    return this.http.get<Address[]>(this.baseUrl, options).pipe(
      map((obj) => obj),
      catchError((e) => {
        return this.errorHandler(e);
      })
    );
  }
}
