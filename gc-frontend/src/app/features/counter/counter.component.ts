import { Component, OnInit, inject, signal } from '@angular/core';
import { CounterService } from './counter.service';
import { Counter } from '../../models/counter.model';
import { RecordModel } from 'pocketbase';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnInit {

  ngOnInit(): void {
    this.getCounters()
  }

  counterService = inject(CounterService)
  counters = signal<Counter[]>([])

  buildCounterObject(counterObject: RecordModel[]): Counter[] {
    const createdCounters: Counter[] = []
    counterObject.forEach((objectCounter) => {
      const counter: Counter = {
        id: objectCounter["id"],
        value_1: objectCounter["value_1"],
        value_2: objectCounter["value_2"],
        user_id: objectCounter["user_id"]
      }
      createdCounters.push(counter)
    })
    return createdCounters
  }

  buildBodyForValueChange(counterValue: number, valueNumber: number, e: Event): Object {
    let data = {}
    let increasedValue = 0
    const button: HTMLElement = e.target as HTMLElement
    if (button.innerText == "Increase") {
      increasedValue = counterValue + 1
    }
    else if (button.innerText == "Decrease") {
      increasedValue = counterValue - 1
    }
    if (valueNumber == 1) {
      data = {
        "value_1": increasedValue
      }
    }
    else if (valueNumber == 2) {
      data = {
        "value_2": increasedValue
      }
    }
    return data
  }

  async getCounters() {
    try {
      const counterObject = await this.counterService.getCounters$()
      this.counters.set(this.buildCounterObject(counterObject))
    } catch (error) {
      console.error("Error: " + error)
    }
  }

  async increaseCounter(counterId: string, counterValue: number, valueNumber: number, e: Event) {
    try {
      const data = this.buildBodyForValueChange(counterValue, valueNumber, e)
      await this.counterService.updateCounter$(counterId, data)
      this.getCounters()
    } catch (error) {
      console.error("Error" + error)
    }
  }

  async decreaseCounter(counterId: string, counterValue: number, valueNumber: number, e: Event) {
    try {
      const data = this.buildBodyForValueChange(counterValue, valueNumber, e)
      await this.counterService.updateCounter$(counterId, data)
      this.getCounters()
    } catch (error) {
      console.error("Error: " + error)
    }
  }
}