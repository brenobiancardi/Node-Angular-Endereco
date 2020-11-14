import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: Login;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    localStorage.clear();
    this.login = {
      login: '',
      senha: '',
    };
  }

  performLogin(): void {
    this.loginService.tryLogin(this.login).subscribe(() => {
      const token = localStorage.getItem('Token');
      if (token) {
        this.router.navigate(['/address']);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
