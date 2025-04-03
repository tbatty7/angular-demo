import {TestBed} from '@angular/core/testing';
import {CounterService} from './counter.service';

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterService]
    });
    service = TestBed.inject(CounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial value of 0', () => {
    expect(service.currentValue).toBe(0);
  });

  it('should increment the counter', () => {
    const initialValue = service.currentValue;
    service.increment();
    expect(service.currentValue).toBe(initialValue + 1);
  });

  it('should decrement the counter', () => {
    service.setValue(10);
    service.decrement();
    expect(service.currentValue).toBe(9);
  });

  it('should set a specific value', () => {
    service.setValue(42);
    expect(service.currentValue).toBe(42);
  });

  it('should emit new values through the observable', (done) => {
    service.counter$.subscribe(value => {
      expect(value).toBe(7);
      done();
    });

    service.setValue(7);
  });
});
