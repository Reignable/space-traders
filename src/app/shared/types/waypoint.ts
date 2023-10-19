import { FactionSymbol } from './faction';
import { WaypointType } from './waypoint-type';
import { Chart } from './chart';
import { WaypointTrait } from './waypoint-trait';

export type Waypoint = {
  symbol: string;
  type: WaypointType;
  systemSymbol: string;
  x: number;
  y: number;
  orbitals: {
    symbol: string;
  }[];
  orbits: string;
  faction: {
    symbol: FactionSymbol;
  };
  traits: WaypointTrait[];
  chart: Chart;
};
