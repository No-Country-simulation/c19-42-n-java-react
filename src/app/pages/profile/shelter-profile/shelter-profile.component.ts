import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryService } from '../../../core/services/gallery/gallery.service';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Pet } from '../../../core/interfaces/Pet';

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

	constructor(
		private route: ActivatedRoute,
		private shelterService: GalleryService
	) {}

	ngOnInit(): void {
		const shelterId = this.route.snapshot.paramMap.get('id');
		if (shelterId) {
			this.shelter$ = this.shelterService.getShelterById(shelterId);
			this.pets$ = this.shelterService.getPetsByShelterId(shelterId);
			this.shelter$.subscribe({
				next: (shelter) => {
					console.log('Shelter Data:', shelter);
				},
				error: (error) => {
					console.error('Error fetching shelter:', error);
				},
			});
			this.pets$.subscribe({
				next: (pets) => {
					console.log('Pets Data:', pets);
				},
				error: (error) => {
					console.error('Error fetching pets:', error);
				},
			});
		} else {
			this.errorMessage = 'Refugio no encontrado';
		}
	}
}
