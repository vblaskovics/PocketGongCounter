import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { RecordModel } from 'pocketbase';
import { AuthService } from '../../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class CounterService {
  api = inject(ApiService)
  auth = inject(AuthService)
  path = 'counters'

  getCounters$(): Promise<RecordModel[]>{
    return this.api.get(this.auth.getUserId())
  }

  updateCounter$(counterId: string, data: any): Promise<RecordModel>{
    return this.api.update(counterId, data)
  }
}
