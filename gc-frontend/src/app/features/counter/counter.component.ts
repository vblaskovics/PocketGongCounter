import { Component, OnInit, inject, signal } from '@angular/core';
import { CounterService } from './counter.service';
import { Counter } from './counter.model';

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

  getCounters() {
    this.counterService.getCounters$().subscribe((res) => {
      this.counters.set(res)
    })
  }

  // ERROR TypeError: updater is not a function ???????
  // updateCounters() {
  //   this.counterService.getCounters$().subscribe((res) => {
  //     this.counters.update(res)
  //   })
  // }

  increaseNumber(id: number, value: number) {
    value += 1
    this.counterService.putCounter$(id.toString(), value.toString()).subscribe((resp) => {
      if (resp == "200") {
        console.log("Updated!")
        this.getCounters()
      } else {
        console.error("Failed to update the counter...");
      }
    });
  }

  decreaseNumber(id: number, value: number) {
    value -= 1
    this.counterService.putCounter$(id.toString(), value.toString()).subscribe((resp) => {
      if (resp == "200") {
        console.log("Updated!")
        this.getCounters()
      } else {
        console.error("Failed to update the counter...");
      }
    });
  }
}