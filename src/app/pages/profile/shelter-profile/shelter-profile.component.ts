import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { GalleryService } from '../../../core/services/gallery/gallery.service';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
	errorMessage: string = '';

	constructor(
		private route: ActivatedRoute,
		private shelterService: GalleryService
	) {}

	ngOnInit(): void {
		const shelterId = this.route.snapshot.paramMap.get('id');
		if (shelterId) {
			this.shelter$ = this.shelterService.getShelterById(shelterId);
			this.shelter$.subscribe({
				next: (shelter) => {
					console.log('Shelter Data:', shelter);
				},
				error: (error) => {
					this.errorMessage = 'No existe el refugio';
				},
			});
		} else {
			this.errorMessage = 'Refugio no encontrado';
		}
	}
}
