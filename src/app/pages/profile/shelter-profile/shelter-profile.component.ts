import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryService } from '../../../core/services/gallery/gallery.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Pet } from '../../../core/interfaces/Pet';
import { LoginService } from '../../../core/services/login.service';


@Component({
	selector: 'app-shelter-profile',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		AsyncPipe,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatSelectModule,
	],
	templateUrl: './shelter-profile.component.html',
	styleUrl: './shelter-profile.component.scss',
})
export class ShelterProfileComponent implements OnInit {
	shelter$: Observable<any> | undefined;
	pets$: Observable<Pet[]> | undefined;
	defaultPets: Pet[] = [];
	sortedPets: Pet[] = [];
	errorMessage: string = '';
	currentUserId: number | null = null;
	shelterUserId: number | null = null;

	shelterId: any | undefined;
  petId: any | undefined;
  selectedFile: File | null = null;
	petService: any;
	editPetForm: any;
	

	constructor(
		
		private route: ActivatedRoute,
		private shelterService: GalleryService,
		private loginService: LoginService
	) {}

	ngOnInit(): void {
		this.currentUserId = this.loginService.getUserPayload()?.id ?? null;
		const shelterId = this.route.snapshot.paramMap.get('shelterId');

		if (shelterId) {
			this.shelter$ = this.shelterService.getShelterById(shelterId);
			this.pets$ = this.shelterService.getPetsByShelterId(shelterId);

			this.shelter$.subscribe({
				next: (shelter) => {
					this.shelterUserId = shelter.usuarioId;
				},
				error: (error) => {
					console.error('Error fetching shelter:', error);
					this.errorMessage = 'Error fetching shelter data';
				},
			});
			
			this.pets$.subscribe({
				next: (pets) => {
					this.sortedPets = pets;
					this.defaultPets = [...pets];
				},
				error: (error) => {
					console.error('Error fetching pets:', error);
					this.errorMessage = 'Error fetching pets data';
				},
			});
		} else {
			this.errorMessage = 'Refugio no encontrado';
		}
}

	sortPets(order: string): void {
		const sortFunctions: { [key: string]: (a: Pet, b: Pet) => number } = {
			default: () => 0,
			'name-az': (a, b) => a.nombre.localeCompare(b.nombre),
			'name-za': (a, b) => b.nombre.localeCompare(a.nombre),
			'breed-az': (a, b) => a.raza.localeCompare(b.raza),
			'breed-za': (a, b) => b.raza.localeCompare(a.raza),
			'age-asc': (a, b) => a.edad - b.edad,
			'age-desc': (a, b) => b.edad - a.edad,
			'coat-asc': (a, b) => a.pelaje.localeCompare(b.pelaje),
			'coat-desc': (a, b) => b.pelaje.localeCompare(a.pelaje),
			'weight-asc': (a, b) => a.peso - b.peso,
			'weight-desc': (a, b) => b.peso - a.peso,
			type: (a, b) => a.tipo_mascota.localeCompare(b.tipo_mascota),
		};

		const sortFunction = sortFunctions[order] || sortFunctions['default'];
		this.sortedPets =
			order === 'default'
				? [...this.defaultPets]
				: this.sortedPets.sort(sortFunction);
	}

	canEdit(): boolean {
		return this.currentUserId === this.shelterUserId;
	}

	deletePet(pet: Pet): void {
		alert('Delete Pet');
	}
}
