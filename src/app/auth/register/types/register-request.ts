import { FactionSymbol } from '@shared/types';

export type RegisterRequest = {
  faction: FactionSymbol;
  symbol: string;
};
