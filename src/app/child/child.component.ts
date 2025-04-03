import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent implements OnInit {
  @Output() addItemEvent = new EventEmitter<string>();
  @Input() emojiName: string = '';

  ngOnInit() {
    if (!this.emojiName) {
      this.emojiName = 'Not passed';
    }
  }


  addItemFromChild() {
    this.addItemEvent.emit('🐢');
  }
}
