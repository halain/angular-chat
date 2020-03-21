import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string = '';
  mensajeSubscriptio: Subscription
  elemento: HTMLElement;
  mensajes: any[] = [];

  constructor(
    public chatService:ChatService
  ) { }
  ngOnDestroy(): void {
    this.mensajeSubscriptio.unsubscribe();
  }

  ngOnInit(): void {

    this.elemento = document.getElementById('chat-mensajes');

    this.mensajeSubscriptio = this.chatService.getMessage().subscribe( (msg) => {
        //mensajes recibidos
          //console.log(msg);
        
        this.mensajes.push(msg);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
        
    });

  }


  //enviando un mensaje por socket al servidor
  enviar(){
    
    if (this.texto.trim().length === 0 ){
      return;
    }

    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}
