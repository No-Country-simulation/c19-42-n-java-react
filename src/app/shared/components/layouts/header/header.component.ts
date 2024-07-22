import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, RouterLinkActive],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css', '/src/app/app.component.scss'],
})
export class HeaderComponent {
	constructor() {}

	public headerRoutes = [
		{
			title: 'Animales',
			link: '/gallery',
		},
		{
			title: 'Refugios',
			link: '/refuges',
		},
		{
			title: 'Donaciones',
			link: '/donations',
		},
		{
			title: 'Contacto',
			link: '/contact',
		},
	];
}
