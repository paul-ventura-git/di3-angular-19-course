import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

/**
 * Authorization guard that checks if the user is authenticated. If not, it redirects to the login page.
 * @param route
 * @param segments
 * @returns
 */
export const authGuard: CanMatchFn = (
  route,
  segments,
): MaybeAsync<GuardResult> => {
  const router = inject(Router);

  return inject(AuthService).currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      }

      return router.createUrlTree(['/auth/login']);
    }),
  );
};
