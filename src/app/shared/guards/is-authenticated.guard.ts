import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '..';
import { inject } from '@angular/core';

export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.token()) {
      return true;
    }

    router.navigate(['auth', 'login']);
    return false;
  };
};
