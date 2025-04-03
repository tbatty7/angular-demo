// counter.service.ts
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private counterSubject = new BehaviorSubject<number>(0);
  counter$: Observable<number> = this.counterSubject.asObservable();

  constructor() {
  }

  get currentValue(): number {
    return this.counterSubject.getValue();
  }

  increment(): number {
    const newValue = this.currentValue + 1;
    this.counterSubject.next(newValue);
    return newValue;
  }

  decrement(): number {
    const newValue = this.currentValue - 1;
    this.counterSubject.next(newValue);
    return newValue;
  }

  setValue(value: number): void {
    this.counterSubject.next(value);
  }
}
