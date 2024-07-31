import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SectionTitleComponent } from '../../shared/components/titles/section-title/section-title.component';
import { RouterModule } from '@angular/router';
import { LittleTitleComponent } from '../../shared/components/titles/little-title/little-title.component';
import { Pet } from '../../core/interfaces/Pet';
import { HomeService } from '../../core/services/home/home.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		RouterModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		SectionTitleComponent,
		LittleTitleComponent,
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
	recentPets: Pet[] = [];
	errorMessage: string = '';

	constructor(private homeService: HomeService) {}

	ngOnInit(): void {
		this.homeService.getRecentPets().subscribe({
			next: (pets) => {
				this.recentPets = pets;
			},
			error: (error) => {
				console.error('Error fetching recent pets:', error);
				this.errorMessage = 'Error fetching recent pets';
			},
		});
	}

	public teamMembers = [
		{
			name: 'Diego Díaz',
			position: 'Product Manager',
			photo: '/assets/home/profiles/diego.webp',
			linkedIn: 'https://www.linkedin.com/in/diego-d%C3%ADaz-44633a28b/',
		},
		{
			name: 'Nuri Ibañez',
			position: 'Analista QA',
			photo: '/assets/home/profiles/nuri.webp',
			linkedIn: 'https://www.linkedin.com/in/nuriei/',
		},
		{
			name: 'Melania Racacha Flores',
			position: 'Diseñadora UX/UI',
			photo: '/assets/home/profiles/melania.webp',
			linkedIn: 'https://www.linkedin.com/in/melania-racacha-flores/',
		},
		{
			name: 'Ignacio Revainera',
			position: 'Desarrollador Frontend',
			photo: '/assets/home/profiles/ignacio.webp',
			linkedIn: 'https://www.linkedin.com/in/ignaciorevainera',
		},
		{
			name: 'Nestor Rubiano',
			position: 'Desarrollador Frontend',
			photo: '/assets/home/profiles/nestor.webp',
			linkedIn: 'https://www.linkedin.com/in/nestor-rubiano-b205a9270/',
		},
		{
			name: 'Hugo Catalán',
			position: 'Desarrollador Frontend',
			photo: '/assets/home/profiles/hugo.webp',
			linkedIn: 'https://www.linkedin.com/in/hugo-catalan-895886133/',
		},
		{
			name: 'Sebastián Velarde',
			position: 'Desarrollador Backend',
			photo: '/assets/home/profiles/sebastian.webp',
			linkedIn: 'https://www.linkedin.com/in/sebasvelardedev/',
		},
		{
			name: 'Abel Fucili',
			position: 'Desarrollador Backend',
			photo: '/assets/home/profiles/abel.webp',
			linkedIn: 'https://www.linkedin.com/in/abel-fucili-12055aa5/',
		},
	];
}
