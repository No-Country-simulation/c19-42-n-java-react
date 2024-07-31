import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryService } from '../../../core/services/gallery/gallery.service';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Pet } from '../../../core/interfaces/Pet';
import { LoginService } from '../../../core/services/login.service';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-shelter-profile',
	standalone: true,
	imports: [
		RouterModule,
		AsyncPipe,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
	],
	templateUrl: './shelter-profile.component.html',
	styleUrl: './shelter-profile.component.scss',
})
export class ShelterProfileComponent {
	shelter$: Observable<any> | undefined;
	pets$: Observable<Pet[]> | undefined;
	errorMessage: string = '';
	currentUserId: number | null = null;
	shelterUserId: number | null = null;

	shelterId: any | undefined;
  petId: any | undefined;
  selectedFile: File | null = null;
	

	constructor(
		
		private route: ActivatedRoute,
		private router: Router,
		private shelterService: GalleryService,
		private loginService: LoginService
	) {}

	ngOnInit(): void {
		this.currentUserId = this.loginService.getUserPayload()?.id ?? null;
		const shelterId = this.route.snapshot.paramMap.get('shelterId');
		console.log('Shelter ID:', shelterId);

		if (shelterId) {
			this.shelter$ = this.shelterService.getShelterById(shelterId);
			this.pets$ = this.shelterService.getPetsByShelterId(shelterId);

			this.shelter$.subscribe({
				next: (shelter) => {
					console.log('Shelter Data:', shelter);
					this.shelterUserId = shelter.usuarioId;
				},
				error: (error) => {
					console.error('Error fetching shelter:', error);
					this.errorMessage = 'Error fetching shelter data';
				},
			});

			this.pets$.subscribe({
				next: (pets) => {
					console.log('Pets Data:', pets);
				},
				error: (error) => {
					console.error('Error fetching pets:', error);
					this.errorMessage = 'Error fetching pets data';
				},
			});
		} else {
			this.errorMessage = 'Refugio no encontrado';
		}

		this.route.paramMap.subscribe(params => {
			const shelterId = params.get('shelterId');
			const petId = params.get('id');
			this.shelterId = shelterId ? Number(shelterId) : null;
			this.petId = petId ? Number(petId) : null;
			console.log('ID del refugio:', this.shelterId);
			console.log('ID de la mascota:', this.petId);
		  });
		}
	

	goToAnimalProfile(shelterId: string, petId: string): void {
		this.router.navigateByUrl(`/shelter/${shelterId}/pet/${petId}`);
	}

	canEdit(): boolean {
		return this.currentUserId === this.shelterUserId;
	}

	addPet(shelterId: number): void {
		this.router.navigateByUrl(`/shelter/${shelterId}/create`);
		//alert('Add Pet');
	}

	editPet(shelterId: string, petId: string): void {
		this.router.navigateByUrl(`/shelter/${shelterId}/pet/${petId}/edit`);
		
	}

	deletePet(pet: Pet): void {
		alert('Delete Pet');
	}
}
