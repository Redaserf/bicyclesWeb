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
      const requiredRoles = route.data['roles'] as number[];

      // Si la ruta solo permite usuarios no autenticados (rutas como login, register, code-verification)
      if (requiredRoles.includes(0)) {
        if (user) {
          // Si están logueados entonces los mandamos a sus respectivos home
          if (user.rol_id === 3) {
            router.navigate(['/admin']);
          } else if (user.rol_id === 2) {
            router.navigate(['/user']);
          }
          return false;
        }
        return true;
      }

      // Si el usuario no está autenticado y la ruta no es pública
      if (!user) {
        router.navigate(['/auth/login']);
        return false;
      }

      // Verifica si el rol del usuario tiene acceso a la ruta
      if (requiredRoles.includes(user.rol_id)) {
        return true;
      }

      // Redirección si el usuario no tiene permisos para esta ruta
      if (user.rol_id === 3) {
        router.navigate(['/admin']);
      } else if (user.rol_id === 2) {
        router.navigate(['/user']);
      } else {
        router.navigate(['/unauthorized']);
      }

      return false;
    }),
    catchError(() => {
      // Si hay un error, redirige al logina
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
