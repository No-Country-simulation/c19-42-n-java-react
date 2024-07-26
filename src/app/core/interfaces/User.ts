export interface User {
	nombres: string;
	apellidos: string;
	email: string;
	username: string;
	password: string;
	edad: number;
	celular: string;
	direccion: string;
}

export interface Shelter {
	nombre: string;
	email: string;
	username: string;
	password: string;
	pais: string;
	provincia: string;
	ciudad: string;
	codigoPostal: number;
	direccion: string;
	celular: string;
}
