import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Counter } from './counter.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CounterService {
  api = inject(ApiService)
  path = 'counters'

  getCounters$(): Observable<any>{
    return this.api.get<Counter[]>(this.path)
  }

  putCounter$(id: string, bodyParams: string): Observable<any>{
    return this.api.put(this.path, id, bodyParams)
  } 
}
