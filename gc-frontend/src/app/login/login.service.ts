import { Injectable, Signal, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authService = inject(AuthService)
  
  async checkCredentials(emailAddress: string, password: string) {
    await this.authService.isAuthenticated(emailAddress, password)
  }
}
