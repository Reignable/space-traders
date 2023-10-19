import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { getSystemSymbol } from '@shared/utilities';
import { DataResponse } from '..';
import { Waypoint } from '@shared/types/waypoint';

@Injectable({ providedIn: 'root' })
export class WaypointService {
  private httpClient = inject(HttpClient);

  getWaypoint(waypointSymbol: string) {
    const systemSymbol = getSystemSymbol(waypointSymbol);
    return this.httpClient.get<DataResponse<Waypoint>>(
      `/systems/${systemSymbol}/waypoints/${waypointSymbol}`
    );
  }
}
