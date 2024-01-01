import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const service = inject(AuthService);
  return service.getIsLogged();
};
