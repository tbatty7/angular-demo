import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChildComponent} from "./child/child.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-demo';
  items: string[] = [];
  addItem(item: string) {this.items.push(item);}
}
