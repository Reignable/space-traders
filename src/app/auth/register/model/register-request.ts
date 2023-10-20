import { FactionSymbol } from '@shared/model';

export type RegisterRequest = {
  faction: FactionSymbol;
  symbol: string;
};
