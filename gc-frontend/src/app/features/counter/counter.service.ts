import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecordModel } from 'pocketbase';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class CounterService {
  api = inject(ApiService)
  auth = inject(AuthService)
  path = 'counters'

  getCounters$(): Promise<RecordModel[]>{
    return this.api.get(this.auth.authenticatedUserId)
  }

  updateCounter$(counterId: string, data: any): Promise<RecordModel>{
    return this.api.update(counterId, data)
  }
}
