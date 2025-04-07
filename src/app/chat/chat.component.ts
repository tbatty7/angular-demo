import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      'Content-Type': 'application/json'
    });

    this.http.post<any>(
      'https://4xi7skzcti.execute-api.us-east-2.amazonaws.com/default/rag-ai-bedrock-tim',
      {message: userInput},
      {headers: headers}
    )
      .subscribe(response => {
        this.messages.push({
          message: JSON.stringify(this.extractText(response)),
          sender: 'bot'
        });
      });
  }


  private extractText(response: any) {
    return response.reply.output.message.content.map((line: any) => line.text).join('\n');
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
