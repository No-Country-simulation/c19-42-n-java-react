import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../core/services/gallery/gallery.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HugeTitleComponent } from '../../shared/components/titles/huge-title/huge-title.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CardShelterComponent } from './card-shelter/card-shelter.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-gallery',
	standalone: true,
	imports: [
		RouterModule,
		MatProgressSpinnerModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		HugeTitleComponent,
		CardShelterComponent,
	],
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
	shelters: any[] = [];
	isLoading: boolean = true;
	errorMessage: string = '';

	constructor(private shelterService: GalleryService) {}

	ngOnInit(): void {
		this.loadShelters();
	}

	loadShelters(): void {
		this.shelterService.getShelters().subscribe({
			next: (data) => {
				this.shelters = data;
				this.isLoading = false;
			},
			error: (error) => {
				console.error('Error fetching shelters', error);
				this.errorMessage = 'No se pudieron cargar los refugios.';
				this.isLoading = false;
			},
		});
	}
}
