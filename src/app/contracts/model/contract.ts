import { FactionSymbol, IsoDateString } from '@shared/model';
import { ContractTerms } from './contract-terms';
import { ContractType } from './contract-type';

export type Contract = {
  id: string;
  factionSymbol: FactionSymbol;
  type: ContractType;
  terms: ContractTerms;
  accepted: boolean;
  fulfilled: boolean;
  expiration: IsoDateString;
  deadlineToAccept: IsoDateString;
};
