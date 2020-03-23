import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
      public wsService: WebsocketService,
      public chatServices: ChatService
  ) {
    
  }

  ngOnInit(): void {
    
    //escuchar los mensajes privados
    this.chatServices.getMessagePrivate().subscribe( (msg) => {
        console.log(msg);
        
    });

  }

}
