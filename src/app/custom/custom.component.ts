import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.css'
})
export class CustomComponent {
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
}
