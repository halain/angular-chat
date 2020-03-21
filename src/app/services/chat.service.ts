import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
      public wsServices:WebsocketService
  ) { }

  //metodo para enviar mensajes
  sendMessage(mensaje: string){

    const payload = {
      de: 'Hector',
      cuerpo: mensaje
    }

    this.wsServices.emit('mensaje', payload);

  }

  //metodo para recibir mensajes
  getMessage(){

    return this.wsServices.listen('mensaje-nuevo'); //retorna observable hay que subscribirse donde se llame a este metodo

  }




}
