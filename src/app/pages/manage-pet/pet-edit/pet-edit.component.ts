import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService } from '../service/pet.service';
import { Pet } from '../model/pet';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pet-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pet-edit.component.html',
  styleUrl: './pet-edit.component.css'
})
export class PetEditComponent{
  editPetForm: FormGroup;
  petId: number | null = null;
  selectedFile: File | null = null;
  shelterId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editPetForm = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      tipoMascota: ['', Validators.required],
      peso: ['', Validators.required],
      pelaje: ['', Validators.required],
      sexo: ['', Validators.required],
      nivelActividad: ['', Validators.required],
      protectoraID: ['', Validators.required],
      edad: ['', Validators.required],
      img: ['']
    });
  }

  ngOnInit(): void {
    // Obtener los ID de la ruta
  this.route.paramMap.subscribe(params => {
    const shelterId = params.get('shelterId');
    const petId = params.get('petId');
    
    // Asignar los valores obtenidos, o null si no están presentes
    this.shelterId = shelterId ? Number(shelterId) : null;
    this.petId = petId ? Number(petId) : null;

    console.log('ID del refugio:', this.shelterId);
    console.log('ID de la mascota:', this.petId);

    if (this.petId) {
      // Cargar la información de la mascota si el ID es válido
      this.petService.getPetById(this.petId).subscribe((pet: Pet) => {
        this.editPetForm.patchValue({
          nombre: pet.nombre,
          raza: pet.raza,
          tipoMascota: pet.tipoMascota,
          peso: pet.peso,
          pelaje: pet.pelaje,
          sexo: pet.sexo,
          nivelActividad: pet.nivelActividad, 
          protectoraID: pet.protectoraID,
          edad: pet.edad
        });
      });
    }
  });
}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  updatePet(): void {
    if (this.editPetForm.valid) {
      if (this.petId !== null) {
        const updatedPet = new FormData();
        for (const [name, control] of Object.entries(this.editPetForm.controls)) {
          updatedPet.append(name, control.value);
        }
        if (this.selectedFile) {
          updatedPet.append('img', this.selectedFile);
        }
  
        this.petService.updatePet(this.petId, updatedPet).subscribe({
          next: () => {
            this.router.navigate(['/manage-pet/list']);
          },
          error: (err) => {
            console.error('Error al actualizar la mascota', err);
          }
        });
      } else {
        console.error('ID de la mascota es null. No se puede actualizar la mascota.');
        // Puedes agregar alguna lógica adicional aquí, como mostrar un mensaje de error al usuario.
      }
    }
  }

}
