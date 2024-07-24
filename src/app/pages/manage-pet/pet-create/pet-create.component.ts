import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder,
  FormGroup, 
  ReactiveFormsModule, 
  Validators } from '@angular/forms';
import { Pet } from '../model/pet';
import { PetService } from '../service/pet.service';
import { Router } from '@angular/router';
import { MockPetService } from '../service/mock-pet.service';

@Component({
  selector: 'app-pet-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pet-create.component.html',
  styleUrl: './pet-create.component.css'
})
export class PetCreateComponent {
  createPetForm: FormGroup;
  
  
 
  
 
  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private router: Router
  ) {
    
      this.createPetForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      tipoMascota: [''],
      peso:['', [Validators.required, Validators.min(0)]],
      pelaje:['',Validators.required],
      sexo:['', Validators.required],
      nivelActividad:[''],
      protectoraId:['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['']
    });
  }

  ngOnInit(): void {}
  

  createPet(): void {
    if (this.createPetForm.valid) {
      const newPet: Pet = this.createPetForm.value;
      console.log('Datos del formulario:', newPet); // Imprimir los datos en la consola
      this.petService.createPet(newPet).subscribe(() => {
        console.log('Mascota creada:', newPet); // Confirmar que la mascota ha sido creada
        this.router.navigate(['baseUrl']);
      });
    } else {
      console.log('El formulario no es válido');
    }
  }
}