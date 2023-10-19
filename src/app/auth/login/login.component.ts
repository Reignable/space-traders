import { Component, effect, inject } from '@angular/core';
import { LoginFormComponent } from './ui/login-form.component';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './data/login.service';
import { AuthService } from '@shared/data';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [LoginFormComponent, RouterLink],
  providers: [LoginService],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginService = inject(LoginService);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.token()) {
        this.router.navigate(['home']);
      }
    });
  }
}
