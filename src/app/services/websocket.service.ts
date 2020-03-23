import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Usuario } from '../classes/usuario';

@Injectable({
	providedIn: "root"
})
export class WebsocketService {
	public socketStatus: boolean = false;
	public usuario: Usuario = null;

	constructor(private socket: Socket) {
		this.cargarStorage();
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
		//console.log(`Emitiendo evento: "${evento}"`);
		this.socket.emit(evento, payload, callback);
	}

	/**
	 * Metodo que ESCUCHA todos los eventos que son emitidos desde el servidor de sockets,
	 * 
	 */
	listen(evento: string) {
		//console.log(`Recibiendo evento: "${evento}"`);
		return this.socket.fromEvent( evento );
	}


	/**
	 * Metodo para que el servidor conozca que usuario esta conectado
	 */
	loginWS( nombre: string){
		//console.log('Configurando ', nombre);

		return new Promise( (resolve, reject) => {

			this.emit('configurar-usuario', { nombre }, (resp)=> {
				
				//console.log(resp); //respuesta desde el servidor socket

				this.usuario = new Usuario(nombre);
				this.guardarStorage();
				resolve();
							
			});

		});

	}

	getUsuario(){
		return this.usuario;
	}


	//Guardar el usuario en el storage paque que no se pierda al refrescar el navegador
	guardarStorage(){
		localStorage.setItem('usuario', JSON.stringify(this.usuario));
	}

	cargarStorage(){
		if (localStorage.getItem('usuario')) {
			this.usuario = JSON.parse(localStorage.getItem('usuario'));
			//enviar al socket nuevamente el usuario, por si refresca el navegador
			this.loginWS(this.usuario.nombre);
		}
	}


}
