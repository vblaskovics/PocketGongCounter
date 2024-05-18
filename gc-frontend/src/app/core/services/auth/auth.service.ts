import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { ClientResponseError } from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiService = inject(ApiService);
  pb = this.apiService.pb;
  router = inject(Router);
  user: WritableSignal<null | User> = signal(null);

  constructor() {
    this.initUser();
  }

  async login(email: string, password: string) {
    try {
      await this.pb.collection('users').authWithPassword(email, password);
      this.initUser();
      this.router.navigateByUrl('/home');
    } catch (error) {
      if (!(error instanceof ClientResponseError)) {
        console.error(error);
        return;
      }
      if (error.status == 400) {
        console.log(error.status, error.message);
      }
    }
  }

  async logout() {
    try {
      this.pb.authStore.clear();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('logout error', error);
    }
  }

  initUser() {
    if (this.pb.authStore.isValid) {
      this.user.set({
        id: this.pb.authStore.model ? this.pb.authStore.model['id'] : '',
        email: this.pb.authStore.model ? this.pb.authStore.model['email'] : '',
      });
    }
  }

  isAuthenticated() {
    return this.pb.authStore.isValid;
  }

  getUserId(): string {
    return this.pb.authStore.model ? this.pb.authStore.model['id'] : '';
  }
}
