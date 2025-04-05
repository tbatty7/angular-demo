import {Component} from '@angular/core';
import {ChildComponent} from "../child/child.component";
import {FormsModule} from "@angular/forms";
import {CustomComponent} from "../custom/custom.component";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, FormsModule, CustomComponent, NgIf, AsyncPipe, JsonPipe],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {
  counter = 0;
  title = 'angular-demo';
  items: string[] = [];
  lambdaResponse: any = null;
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {
  }

  addItem(item: string) {
    this.items.push(item);
  }

  callLambda() {
    this.loading = true;
    this.error = null;

    this.http.get('https://7oom5qeed8.execute-api.us-east-2.amazonaws.com/default/deleteme')
      .subscribe({
        next: (response) => {
          console.log('Lambda response:', response);
          this.lambdaResponse = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error calling Lambda:', JSON.stringify(error, null, 2));
          this.error = error.message || 'An error occurred while calling the Lambda function';
          this.loading = false;
        }
      });
  }

  protected readonly of = of;
}
