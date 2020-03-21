import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable({
	providedIn: "root"
})
export class WebsocketService {
	public socketStatus: boolean = false;

	constructor(private socket: Socket) {
		this.checStatus();
	}

	/**
	 * Metodo para chequear el status de la conexion al servidor de sockets desde el cliente. Por ejemplo si se cae el servidor de sockets, etc
	 * los dos servicios declarados son observables
	 */
	checStatus() {
		this.socket.on("connect", () => {
			console.log("Conectado al servidor");
			this.socketStatus = true;
		});

		this.socket.on("disconnect", () => {
			console.log("Desconectado del servidor");
			this.socketStatus = false;
		});
	}

	/**
	 * Metodo que EMITE todos los eventos que pueda disparar la aplicacion de angular,
	 *  para que sea reutilizable en otros proyectos, o partes de la aplicacion, etc
	 */
	emit(evento: string, payload?: any, callback?: Function) {
		//Emitir evento emit('EVENTO', payload, callback?)
		console.log(`Emitiendo evento: "${evento}"`);
		
		this.socket.emit(evento, payload, callback);
	}

	/**
	 * Metodo que ESCUCHA todos los eventos que son emitidos desde el servidor de sockets,
	 * 
	 */
	listen(evento: string) {
		console.log(`Recibiendo evento: "${evento}"`);
		return this.socket.fromEvent( evento );
	}

}
