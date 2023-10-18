import { Route } from '@angular/router';

export const authRoutes: Route[] = [
  // { path: 'login', loadComponent: () => import('./login/login.component') },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
];
