import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { RecordModel } from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiService = inject(ApiService)

  pb = this.apiService.pb

  authenticated = signal(false)
  authenticatedUser: any = {}
  authenticatedUserId: string = ""

  async isAuthenticated(email: string, password: string) {
    try {
      await this.pb.collection('users').authWithPassword(email, password);
      if (this.pb.authStore.isValid) {
        this.authenticatedUser = this.pb.authStore.model
        this.authenticatedUserId = this.authenticatedUser["id"]
        this.authenticated.set(true)
      }
    }
    catch (error) {
      console.error("Login failed: " + error)
    }
  }
}
