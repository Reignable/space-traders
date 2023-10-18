import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { RegisterRequest, RegisterResponse } from '../../auth/register/types';
import { LoginRequest } from '@auth/login/types/login-request';
import { Agent } from '..';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpClient = inject(HttpClient);

  private auth = signal<RegisterResponse | null>(null);

  readonly agent = computed(() => this.auth()?.agent);
  readonly token = computed(() => this.auth()?.token);

  register(request: RegisterRequest) {
    return this.httpClient
      .post<RegisterResponse>('/register', request)
      .pipe(tap(response => this.auth.set(response)));
  }

  login(request: LoginRequest) {
    const { token } = request;
    return this.httpClient
      .get<Agent>('/my/agent', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        tap(agent => {
          this.auth.set({ agent, token });
        })
      );
  }

  logout() {
    this.auth.set(null);
  }
}
