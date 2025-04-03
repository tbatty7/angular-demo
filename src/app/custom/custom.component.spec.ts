import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CustomComponent} from './custom.component';
import {CounterService} from '../services/counter/counter.service';
import {By} from '@angular/platform-browser';

describe('CustomComponent', () => {
  let component: CustomComponent;
  let fixture: ComponentFixture<CustomComponent>;
  let counterService: CounterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomComponent],
      providers: [CounterService]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomComponent);
    component = fixture.componentInstance;
    counterService = TestBed.inject(CounterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial counter value of 0', () => {
    expect(component.counter).toBe(0);
  });

  it('should increment counter value by 1', () => {
    const initialValue = component.counter;
    spyOn(counterService, 'increment').and.callThrough();

    component.increment();

    expect(counterService.increment).toHaveBeenCalled();
    expect(component.counter).toBe(initialValue + 1);
  });

  it('should decrement counter value by 1', () => {
    component.counter = 5;
    fixture.detectChanges();

    spyOn(counterService, 'decrement').and.callThrough();

    component.decrement();

    expect(counterService.decrement).toHaveBeenCalled();
    expect(component.counter).toBe(4);
  });

  it('should emit the updated counter value when changed', () => {
    spyOn(component.counterChange, 'emit');

    component.increment();

    expect(component.counterChange.emit).toHaveBeenCalledWith(1);
  });

  it('should have functioning increment and decrement buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);

    expect(component.counter).toBe(0);

    const incrementButton = buttons[1]; // Assuming the second button is increment
    incrementButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.counter).toBe(1);

    const decrementButton = buttons[0]; // Assuming the first button is decrement
    decrementButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.counter).toBe(0);
  });

  it('should update counter when input value changes', () => {
    component.counter = 10;
    fixture.detectChanges();
    expect(component.counter).toBe(10);
  });
});
