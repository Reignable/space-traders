import { Routes } from '@angular/router';
import { ContractsComponent } from './contracts.component';

export default [
  {
    path: '',
    component: ContractsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./list/contract-list.component').then(
            m => m.ContractListComponent
          ),
      },
    ],
  },
] as Routes;
