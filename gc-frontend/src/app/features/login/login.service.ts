import { Injectable, Signal, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  authService = inject(AuthService);

  checkCredentials(emailAddress: string, password: string) {
    return this.authService.isAuthenticated();
  }
}
