export class Pet {

    id?: number;
    nombre: string;
    raza: string;
    tipoMascota: string;
    peso: number;
    pelaje: string;
    sexo: string;
    nivelActividad: string;
    protectoraID: number;
    edad: number;
    //descripcion: string;
    //imagenUrl: string;

    constructor(nombre: string, raza: string, tipoMascota: string, peso: number, pelaje: string, sexo: string, nivelActividad: string, protectoraID: number, edad: number){ //descripcion: string, imagenUrl: string){

        this.nombre = nombre;
        this.raza = raza;
        this.tipoMascota = tipoMascota;
        this.peso = peso;
        this.pelaje = pelaje;
        this.sexo = sexo;
        this.nivelActividad = nivelActividad;
        this.protectoraID = protectoraID;
        this.edad = edad;
        //this.descripcion = descripcion;
        //this.imagenUrl = imagenUrl;
    }
}
