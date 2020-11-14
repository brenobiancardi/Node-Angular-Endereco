import { Router } from '@angular/router';
import { ResponseAPI } from './responseAPI.model';
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

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  errorHandler(
    e: any,
    typeError: string,
    authorized: boolean = false
  ): Observable<any> {
    if (authorized) {
      this.showMessage(e);
    } else if (typeError === 'manual') {
      this.showMessage(e, true);
    } else {
      this.showMessage(
        'Erro no servidor, se persistir o erro contate o suporte!',
        true
      );
    }
    return EMPTY;
  }

  processResponse(response: ResponseAPI): Observable<any> {
    if (response.autenticado) {
      localStorage.setItem('Token', response.token);
      return this.errorHandler('Login realizado com sucesso', 'manual', true);
    } else {
      return this.errorHandler(
        'Erro no login, Verifique seu usuário e senha',
        'manual'
      );
    }
  }

  tryLogin(login: Login): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(this.baseUrl, login).pipe(
      map((obj) => this.processResponse(obj)),
      catchError((e) => {
        return this.errorHandler(e, 'auto');
      })
    );
  }

  recoverToken(): string {
    const token = localStorage.getItem('Token');
    return token;
  }

  verifyToken(token: string): void {
    if (token) {
      return;
    } else {
      this.showMessage('Token invalido, realize o login!', true);
      this.router.navigate(['/login']);
    }
  }
}
