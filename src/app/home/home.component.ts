import { Component, inject } from '@angular/core';
import { AuthService } from '@shared/data';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  authService = inject(AuthService);
}
