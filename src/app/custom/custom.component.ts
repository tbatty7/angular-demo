// custom.component.ts
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {Subscription} from 'rxjs';
import {CounterService} from "../services/counter/counter.service";

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.css'
})
export class CustomComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() set counter(value: number) {
    this.counterService.setValue(value);
  }

  get counter(): number {
    return this.counterService.currentValue;
  }

  @Output() counterChange = new EventEmitter<number>();

  constructor(private counterService: CounterService) {
  }

  ngOnInit(): void {
    this.subscription = this.counterService.counter$.subscribe((value: number) => {
      this.counterChange.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  increment(): void {
    this.counterService.increment();
  }

  decrement(): void {
    this.counterService.decrement();
  }
}
