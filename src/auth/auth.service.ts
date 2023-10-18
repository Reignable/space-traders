import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest, RegisterResponse } from './types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  httpClient = inject(HttpClient);

  register(request: RegisterRequest) {
    return this.httpClient.post<RegisterResponse>('/register', request);
  }
}
