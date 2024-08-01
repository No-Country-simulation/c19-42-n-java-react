import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Pet } from '../model/pet';
import { PetService } from '../service/pet.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-pet-create',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './pet-create.component.html',
	styleUrl: './pet-create.component.css',
})
export class PetCreateComponent {
	createPetForm: FormGroup;
	selectedFile: File | null = null;

	constructor(
		private fb: FormBuilder,
		private petService: PetService,
		private router: Router
	) {
		this.createPetForm = this.fb.group({
			nombre: ['', Validators.required],
			raza: ['', Validators.required],
			tipoMascota: ['', Validators.required],
			peso: ['', [Validators.required, Validators.min(0)]],
			pelaje: ['', Validators.required],
			sexo: ['', Validators.required],
			nivelActividad: ['', Validators.required],
			protectoraID: ['', Validators.required],
			edad: ['', [Validators.required, Validators.min(0)]],
			img: [''],
		});
	}

	ngOnInit(): void {}

	onFileChange(event: any) {
		const file = event.target.files[0];
		if (file) {
			this.selectedFile = file;
			console.log('Archivo seleccionado:', file);
		} else {
			console.error('Error al guardar la imagen.');
		}
	}

	createPet(): void {
		if (this.createPetForm.valid && this.selectedFile) {
			const newPet = new FormData();
			for (const [name, control] of Object.entries(
				this.createPetForm.controls
			)) {
				newPet.append(name, control.value);
			}
			newPet.append('img', this.selectedFile);

			this.petService.createPet(newPet).subscribe({
				next: () => {
					console.log('Mascota creada con éxito', newPet);
					this.router.navigate(['manage-pet/list']);
					this.createPetForm.reset();
					this.selectedFile = null;
				},
			});
		}
	}
}
