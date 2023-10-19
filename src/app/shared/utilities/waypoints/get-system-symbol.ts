import { getSymbolParts } from './get-symbol-parts';

export const getSystemSymbol = (waypointSymbol: string): string => {
  const [sectorSymbol, systemSymbol] = getSymbolParts(waypointSymbol);
  return `${sectorSymbol}-${systemSymbol}`;
};
