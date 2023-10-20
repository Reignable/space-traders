import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PaginatedDataResponse } from '@shared/model';
import { Contract } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private readonly contractsUrl = '/my/contracts';
  private http = inject(HttpClient);

  contracts$ = this.http.get<PaginatedDataResponse<Contract>>(
    this.contractsUrl
  );
}
