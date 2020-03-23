import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Usuario } from '../../classes/usuario';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public wsServices: WebsocketService
  ) {
    this.usuario = wsServices.usuario;

   }

  ngOnInit(): void {
  }

}
