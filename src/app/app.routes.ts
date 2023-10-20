import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from '@shared/guards/is-authenticated.guard';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
  },
  {
    path: 'home',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'contracts',
    // canActivate: [isAuthenticatedGuard()],
    loadChildren: () =>
      import('./contracts/contracts.routes').then(m => m.default),
  },

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
