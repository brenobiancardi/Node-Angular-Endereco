import { MessageService } from './../../message.service';
import { Router } from '@angular/router';
import { ResponseAPI } from './responseAPI.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login.model';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = 'http://localhost:8777/usuarios/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  tryLogin(login: Login): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(this.baseUrl, login).pipe(
      map((obj) => this.messageService.processResponse(obj)),
      catchError((e) => {
        console.log(e.error);
        if (
          e.error.status === 401 &&
          e.error.error === 'Usuario ou senha invalido'
        ) {
          return this.messageService.errorHandler(
            e.error.error,
            'manual',
            e.error.autenticado
          );
        } else {
          return this.messageService.errorHandler(e, 'auto');
        }
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
      this.messageService.showMessage('Token invalido, realize o login!', true);
      this.router.navigate(['/login']);
    }
  }
}
