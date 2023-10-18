import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Faction } from '@shared/types';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'space-traders';
  authService = inject(AuthService);
  formBuilder = inject(NonNullableFormBuilder);
  currentAgent = this.authService.currentAgent$;

  registerForm = this.formBuilder.group({
    symbol: '',
    faction: this.formBuilder.control<Faction>('COSMIC'),
  });

  showingRegisterForm = signal(false);

  showRegisterForm() {
    this.showingRegisterForm.set(true);
  }

  hideRegisterForm() {
    this.showingRegisterForm.set(false);
  }

  submitRegisterForm() {
    this.authService.register(this.registerForm.getRawValue()).subscribe();
    this.hideRegisterForm();
  }
}
