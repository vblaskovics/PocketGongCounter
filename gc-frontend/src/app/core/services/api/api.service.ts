import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  pb = new PocketBase('http://localhost:8090');

  http = inject(HttpClient)

  async get(userId: string) {
    return await this.pb.collection('counters').getFullList({
      filter: `user_id = "${userId}"`,
    });
  }

  async update(counterId: string, data: any) {
    return await this.pb.collection('counters').update(counterId, data);
  }
}
