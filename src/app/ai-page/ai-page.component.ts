import {Component} from '@angular/core';
import {ChatComponent} from "../chat/chat.component";

@Component({
  selector: 'app-ai-page',
  standalone: true,
  imports: [
    ChatComponent
  ],
  templateUrl: './ai-page.component.html',
  styleUrl: './ai-page.component.css'
})
export class AiPageComponent {

}
