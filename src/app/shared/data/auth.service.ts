import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { defer, from, tap } from 'rxjs';
import { RegisterRequest, RegisterResponse } from '../../auth/register/types';
import { Agent } from '../types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpClient = inject(HttpClient);

  private _agent = signal<Agent | null>(null);
  private _token = signal<string | null>(null);

  readonly agent = this._agent.asReadonly();
  readonly token = this._token.asReadonly();

  register(request: RegisterRequest) {
    return from(
      defer(() => this.httpClient.post<RegisterResponse>('/register', request))
    ).pipe(
      tap(response => {
        this._agent.set(response.agent);
        this._token.set(response.token);
      })
    );
  }
}
