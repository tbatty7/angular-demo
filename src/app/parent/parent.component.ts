import {Component} from '@angular/core';
import {ChildComponent} from "../child/child.component";
import {FormsModule} from "@angular/forms";
import {CustomComponent} from "../custom/custom.component";
import {of} from "rxjs";


@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, FormsModule, CustomComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {
  counter = 0;
  title = 'angular-demo';
  items: string[] = [];

  addItem(item: string) {
    this.items.push(item);
  }


  protected readonly of = of;
}


