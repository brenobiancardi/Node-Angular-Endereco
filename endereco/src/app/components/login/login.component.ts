import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: Login;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.login = {
      login: '',
      senha: '',
    };
  }

  realizarLogin(): void {
    this.loginService.tentarLogin(this.login).subscribe(() => {
      const token = localStorage.getItem('Token');
      if (token) {
        this.router.navigate(['/address']);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}
