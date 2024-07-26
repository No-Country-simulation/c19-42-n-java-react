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
  
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      tipoMascota: ['', Validators.required],
      peso:['', [Validators.required, Validators.min(0)]],
      pelaje:['',Validators.required],
      sexo:['', Validators.required],
      nivelActividad:['', Validators.required],
      protectoraID:['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {}
  

  createPet(): void {
    if (this.createPetForm.valid) {
      const newPet: Pet = this.createPetForm.value;
      console.log('Datos del formulario:', newPet); // Imprimir los datos en la consola
      this.petService.createPet(newPet).subscribe(() => {
        console.log('Mascota creada: con exito', newPet); // Confirmar que la mascota ha sido creada
        this.router.navigate(['manage-pet/list']);
      });
    } (error: any) => {
      console.error('El formulario no es válido', error);
    }
  }
}