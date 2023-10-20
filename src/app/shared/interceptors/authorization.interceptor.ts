import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '..';
import { inject } from '@angular/core';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).token();

  if (req.url.includes('/register')) {
    return next(req);
  }

  if (!authToken) {
    throw new Error('No auth token');
  }

  const authorizedRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  });

  return next(authorizedRequest);
};
