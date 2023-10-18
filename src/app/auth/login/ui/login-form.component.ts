import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../types/login-request';

@Component({
  standalone: true,
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<LoginRequest>();

  private formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.nonNullable.group({
    token: '',
  });
}
