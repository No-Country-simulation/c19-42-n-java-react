import { Component } from '@angular/core';
import { Pet } from '../../../core/interfaces/Pet';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GalleryService } from '../../../core/services/gallery/gallery.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-pet-profile',
	standalone: true,
	imports: [RouterModule, MatCardModule, MatButtonModule],
	templateUrl: './pet-profile.component.html',
	styleUrls: ['./pet-profile.component.scss'],
})
export class PetProfileComponent {
	pet: Pet | undefined;
	errorMessage: string = '';

	constructor(
		private route: ActivatedRoute,
		private galleryService: GalleryService
	) {}

	ngOnInit() {
		const petId = this.route.snapshot.paramMap.get('petId');
		if (petId) {
			this.galleryService.getPetById(petId).subscribe({
				next: (pet) => {
					this.pet = pet;
					console.log('Pet Data:', pet);
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

	adoptPet(): void {
		alert('Adopt this pet');
	}
}
