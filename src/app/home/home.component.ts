import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService, WaypointService } from '@shared/data';
import { filterNullish } from '@shared/operators';
import { switchMap, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  authService = inject(AuthService);
  waypointService = inject(WaypointService);
  private router = inject(Router);

  headquarters$ = toObservable(this.authService.agent).pipe(
    tap(console.log),
    filterNullish(),
    switchMap(agent => this.waypointService.getWaypoint(agent.headquarters))
  );

  constructor() {
    effect(() => {
      if (!this.authService.token()) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
