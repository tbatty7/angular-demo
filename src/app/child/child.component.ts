import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  @Output() addItemEvent = new EventEmitter<string>();
  @Input() counter = 0;
  @Output() counterChange = new EventEmitter<number>();

  increment() {
    this.counter++;
    this.counterChange.emit(this.counter);
  }

  decrement() {
    this.counter--;
    this.counterChange.emit(this.counter);
  }

  addItemFromChild() {
    this.addItemEvent.emit('🐢');
  }
}
