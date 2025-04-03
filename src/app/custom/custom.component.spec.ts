import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CustomComponent} from './custom.component';
import {By} from '@angular/platform-browser';

describe('CustomComponent', () => {
  let component: CustomComponent;
  let fixture: ComponentFixture<CustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomComponent);
    component = fixture.componentInstance;
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
    component.increment();
    expect(component.counter).toBe(initialValue + 1);
  });

  it('should decrement counter value by 1', () => {
    component.counter = 5; // Set initial value
    component.decrement();
    expect(component.counter).toBe(4);
  });

  it('should emit the updated counter value when incremented', () => {
    spyOn(component.counterChange, 'emit');
    component.increment();
    expect(component.counterChange.emit).toHaveBeenCalledWith(1);
  });

  it('should emit the updated counter value when decremented', () => {
    component.counter = 5; // Set initial value
    spyOn(component.counterChange, 'emit');
    component.decrement();
    expect(component.counterChange.emit).toHaveBeenCalledWith(4);
  });

  it('should have functioning increment and decrement buttons', () => {
    // Get the buttons
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);

    // Check initial value
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
