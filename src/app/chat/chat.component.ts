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
  messages: { message: string; sender: 'user' | 'bot' }[] = [];

  constructor(private http: HttpClient) {
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;
    const userInput = this.addUserMessageToChat();
    this.sendMessageToAiChat(userInput);
  }

  private sendMessageToAiChat(userInput: string) {
    this.http.post<any>('https://4xi7skzcti.execute-api.us-east-2.amazonaws.com/default/rag-ai-bedrock-tim', {message: userInput})
      .subscribe(response => {
        this.messages.push({message: response.reply, sender: 'bot'});
      });
  }

  private addUserMessageToChat() {
    this.messages.push({message: this.userMessage, sender: 'user'});
    const userInput = this.userMessage;
    this.clearInput();
    return userInput;
  }

  private clearInput() {
    this.userMessage = '';
  }
}
