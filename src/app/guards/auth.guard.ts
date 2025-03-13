import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getAuthenticatedUser().pipe(
    map(user => {
      if (!user) {
        router.navigate(['/auth/login']);
        return false;
      }

      const requiredRoles = route.data['roles'] as number[]; // roles permitidos (los ponemos en las rutas)
      
      if (requiredRoles.includes(user.rol_id)) {
        return true;
      }

      router.navigate(['/unauthorized']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};