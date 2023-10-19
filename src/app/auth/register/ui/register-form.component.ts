import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FactionSymbol } from '@shared/types';
import { RegisterRequest } from '../types';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: 'register-form.component.html',
})
export class RegisterFormComponent {
  @Output() register = new EventEmitter<RegisterRequest>();

  private formBuilder = inject(FormBuilder);
  registerForm = this.formBuilder.nonNullable.group({
    symbol: '',
    faction: this.formBuilder.control<FactionSymbol>('COSMIC'),
  });

  submitRegisterForm() {
    this.register.emit(this.registerForm.getRawValue() as RegisterRequest);
  }
}
