import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from '../services/auth/login.service';

export const validatorLoginOn: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const authService = inject(LoginService); 
  const router = inject(Router);

  return authService.userLoginOn.pipe(
    map((loginOn) => {
      if (!loginOn) {
        return true; // No Permite el acceso si el usuario está autenticado
      } else {
        return router.parseUrl('/home'); // Redirige a la página de home
      }
    })
  );
};
