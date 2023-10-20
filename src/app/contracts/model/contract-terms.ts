import { IsoDateString } from '@shared/model';
import { ContractPayment } from './contract-payment';
import { ContractDeliverGood } from './contract-deliver-good';

export type ContractTerms = {
  deadline: IsoDateString;
  deliver: ContractDeliverGood[];
  payment: ContractPayment;
};
