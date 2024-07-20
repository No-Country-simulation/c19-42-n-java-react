export class Pet {
    
    id: number;
    nombre: string;
    raza: string;
    vacuna: boolean;
    sexo: string;
    edad: number;

    constructor(id: number, nombre: string, raza: string, vacuna: boolean, sexo: string, edad: number){

        this.id = id;
        this.nombre = nombre;
        this.raza = raza;
        this.vacuna = vacuna;
        this.sexo = sexo;
        this.edad = edad;
    }
}
