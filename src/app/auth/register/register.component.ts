import { HttpClientModule } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { AuthService } from '@shared/data';
import { RegisterService } from './data/register.service';
import { RegisterFormComponent } from './ui/register-form.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: 'register.component.html',
  providers: [RegisterService],
  imports: [RegisterFormComponent, HttpClientModule],
})
export class RegisterComponent {
  public registerService = inject(RegisterService);
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
