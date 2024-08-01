import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../core/services/gallery/gallery.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
	selector: 'app-gallery',
	standalone: true,
	imports: [
		RouterModule,
		MatProgressSpinnerModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatOptionModule,
		MatSelectModule,
	],
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
	shelters: any[] = [];
	defaultShelters: any[] = [];
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
				this.defaultShelters = [...data];
				this.isLoading = false;
			},
			error: (error) => {
				console.error('Error fetching shelters', error);
				this.errorMessage = 'No se pudieron cargar los refugios.';
				this.isLoading = false;
			},
		});
	}

	sortShelters(order: string): void {
		if (order === 'default') {
			this.shelters = [...this.defaultShelters];
		} else if (order === 'az') {
			this.shelters.sort((a, b) => a.nombre.localeCompare(b.nombre));
		} else if (order === 'za') {
			this.shelters.sort((a, b) => b.nombre.localeCompare(a.nombre));
		}
	}
}
