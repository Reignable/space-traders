import { Injectable, inject } from '@angular/core';
import { EMPTY, Subject, catchError, switchMap } from 'rxjs';
import { LoginRequest } from '../types/login-request';
import { AuthService } from '@shared/data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class LoginService {
  private authService = inject(AuthService);

  error$ = new Subject<unknown>();
  login$ = new Subject<LoginRequest>();

  loggedIn$ = this.login$.pipe(
    switchMap(request =>
      this.authService.login(request).pipe(
        catchError(error => {
          this.error$.next(error);
          return EMPTY;
        })
      )
    )
  );

  constructor() {
    this.loggedIn$.pipe(takeUntilDestroyed()).subscribe();
  }
}
