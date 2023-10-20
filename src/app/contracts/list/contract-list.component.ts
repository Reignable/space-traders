import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { ContractService } from '../data/contract.service';

@Component({
  standalone: true,
  selector: 'app-contract-list',
  imports: [CommonModule],
  templateUrl: './contract-list.component.html',
})
export class ContractListComponent {
  private contractService = inject(ContractService);

  contracts$ = this.contractService.contracts$.pipe(
    map(request => request.data)
  );
}
