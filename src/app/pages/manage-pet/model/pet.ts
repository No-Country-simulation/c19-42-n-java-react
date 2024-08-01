export class Pet {
    static id: any;
    append(arg0: string, value: any) {
      throw new Error('Method not implemented.');
    }

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
    img?: string; 
    //descripcion: string;
    //imagenUrl: string;

    constructor(nombre: string, raza: string, tipoMascota: string, peso: number, pelaje: string, sexo: string, nivelActividad: string, protectoraID: number, edad: number, img?: string){ //descripcion: string, imagenUrl: string){

        this.nombre = nombre;
        this.raza = raza;
        this.tipoMascota = tipoMascota;
        this.peso = peso;
        this.pelaje = pelaje;
        this.sexo = sexo;
        this.nivelActividad = nivelActividad;
        this.protectoraID = protectoraID;
        this.edad = edad;
        this.img = img;
        //this.descripcion = descripcion;
        //this.imagenUrl = imagenUrl;
    }
}
