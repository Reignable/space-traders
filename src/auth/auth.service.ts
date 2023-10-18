import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { RegisterRequest, RegisterResponse } from './types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentAgent = signal<RegisterResponse | undefined>(undefined);
  readonly currentAgent$ = this.currentAgent.asReadonly();

  httpClient = inject(HttpClient);

  register(request: RegisterRequest) {
    return this.httpClient
      .post<RegisterResponse>('/register', request)
      .pipe(tap(response => this.currentAgent.set(response)));
  }
}
