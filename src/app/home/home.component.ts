import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/data';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (!this.authService.token()) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
