import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "http://localhost:8000"

  http = inject(HttpClient)

  get<T>(route: string){
    return this.http.get(`${this.baseUrl}/${route}`)
  }

  put<T>(route: string, id: string, bodyParams: string){
    return this.http.put(
      `${this.baseUrl}/${route}/${id}`,
      bodyParams
    )
  }
}
