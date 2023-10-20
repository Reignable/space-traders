import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegisterRequest } from '@auth/register/model';
import { AuthService } from '@shared/data';
import { EMPTY, Subject, catchError, switchMap } from 'rxjs';

@Injectable()
export class RegisterService {
  private authService = inject(AuthService);

  error$ = new Subject<unknown>();
  register$ = new Subject<RegisterRequest>();

  agentRegistered$ = this.register$.pipe(
    switchMap(request =>
      this.authService.register(request).pipe(
        catchError(error => {
          this.error$.next(error);
          return EMPTY;
        })
      )
    )
  );

  constructor() {
    this.agentRegistered$.pipe(takeUntilDestroyed()).subscribe();
  }
}
