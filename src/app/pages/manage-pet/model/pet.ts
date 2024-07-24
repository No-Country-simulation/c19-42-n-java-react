export class Pet {
    
    id: number;
    nombre: string;
    raza: string;
    tipoMascota: boolean;
    peso: number;
    pelaje: string;
    sexo: string;
    nivelActividad: boolean;
    protectoraId: number;
    edad: number;
    descripcion: string;
    imagenUrl: string;

    constructor(id: number, nombre: string, raza: string, tipoMascota: boolean, peso: number, pelaje: string, sexo: string, nivelActividad: boolean, protectoraId: number, edad: number, descripcion: string, imagenUrl: string){

        this.id = id;
        this.nombre = nombre;
        this.raza = raza;
        this.tipoMascota = tipoMascota;
        this.peso = peso;
        this.pelaje = pelaje;
        this.sexo = sexo;
        this.nivelActividad = nivelActividad;
        this.protectoraId = protectoraId;
        this.edad = edad;
        this.descripcion = descripcion;
        this.imagenUrl = imagenUrl;
    }
}
