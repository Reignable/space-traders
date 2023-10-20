import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Waypoint } from '@shared/model/waypoint';
import { getSystemSymbol } from '@shared/utilities';
import { map } from 'rxjs';
import { DataResponse } from '..';

@Injectable({ providedIn: 'root' })
export class WaypointService {
  private httpClient = inject(HttpClient);

  getWaypoint(waypointSymbol: string) {
    const systemSymbol = getSystemSymbol(waypointSymbol);
    return this.httpClient
      .get<DataResponse<Waypoint>>(
        `/systems/${systemSymbol}/waypoints/${waypointSymbol}`
      )
      .pipe(map(response => response.data));
  }
}
