import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { getSystemSymbol } from '@shared/utilities';
import { AuthService, DataResponse } from '..';
import { Waypoint } from '@shared/types/waypoint';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WaypointService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);

  getWaypoint(waypointSymbol: string) {
    const systemSymbol = getSystemSymbol(waypointSymbol);
    return this.httpClient
      .get<DataResponse<Waypoint>>(
        `/systems/${systemSymbol}/waypoints/${waypointSymbol}`,
        { headers: { Authorization: `Bearer ${this.authService.token()}` } }
      )
      .pipe(map(response => response.data));
  }
}
