import { Resposta } from './resposta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { Login } from './login.model';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = 'http://localhost:8777/usuarios/login';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      // panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Erro na solicitação', true);
    return EMPTY;
  }

  processarResposta(resposta: any): void {
    if (resposta.autenticado) {
      localStorage.setItem('Token', resposta.token);
    } else {
      throw new Error();
    }
  }

  tentarLogin(login: Login): Observable<Login> {
    return this.http.post<Login>(this.baseUrl, login).pipe(
      map((obj) => this.processarResposta(obj)),
      catchError((e) => {
        return this.errorHandler(e);
      })
    );
  }
}
