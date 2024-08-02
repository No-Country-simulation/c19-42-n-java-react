import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Pet } from '../../core/interfaces/Pet';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from '../../core/services/gallery/gallery.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-adopt-form',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
	],
	templateUrl: './adopt-form.component.html',
	styleUrl: './adopt-form.component.scss',
})
export class AdoptFormComponent implements OnInit {
	pet: Pet | undefined;
	errorMessage: string = '';
	successMessage: string = '';
	adoptForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private galleryService: GalleryService
	) {
		this.adoptForm = this.fb.group({
			fullName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', Validators.required],
			message: [''],
		});
	}

	ngOnInit(): void {
		const petId = this.route.snapshot.paramMap.get('petId');

		if (petId) {
			this.galleryService.getPetById(petId).subscribe({
				next: (pet) => {
					this.pet = pet;
				},
				error: (error) => {
					console.error('Error fetching pet:', error);
					this.errorMessage = 'Error fetching pet data';
				},
			});
		} else {
			this.errorMessage = 'Animal not found';
		}
	}

	onSubmit(): void {
		if (this.adoptForm.valid) {
			this.successMessage = `Formulario para la adopción de ${this.pet?.nombre} se ha enviado con éxito. Nos contactaremos contigo en las próximas semanas.`;
			this.adoptForm.reset();

			setTimeout(() => {
				this.router.navigateByUrl('/');
			}, 5000);
		}
	}
}
