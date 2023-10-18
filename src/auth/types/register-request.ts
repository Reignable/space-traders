import { Faction } from '@shared';

export type RegisterRequest = {
  email: string;
  faction: Faction;
  symbol: string;
};
