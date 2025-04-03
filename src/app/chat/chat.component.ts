import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {NgClass, NgFor} from "@angular/common";


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgFor
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  userMessage: string = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];

  constructor(private http: HttpClient) {
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    // Add user message to chat
    this.messages.push({text: this.userMessage, sender: 'user'});
    const userInput = this.userMessage;
    this.userMessage = ''; // Clear input box

    // Call AWS Lambda (or any backend) to get AI response
    this.http.post<any>('https://your-api-endpoint.com/chat', {message: userInput})
      .subscribe(response => {
        this.messages.push({text: response.reply, sender: 'bot'});
      });
  }
}
