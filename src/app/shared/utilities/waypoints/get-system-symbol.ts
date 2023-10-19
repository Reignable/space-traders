import { getSymbolParts } from './get-symbol-parts';

export const getSystemSymbol = (waypointSymbol: string): string =>
  getSymbolParts(waypointSymbol)[1];
