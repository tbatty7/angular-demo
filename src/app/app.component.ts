import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChildComponent} from "./child/child.component";
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {CustomComponent} from "./custom/custom.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChildComponent, FormsModule, CustomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  counter = 0;
  title = 'angular-demo';
  items: string[] = [];

  addItem(item: string) {
    this.items.push(item);
  }


  protected readonly of = of;
}
