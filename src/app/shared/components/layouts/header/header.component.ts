import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { title } from 'process';

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
		{ title: 'Inicio', link: '/' },
		{
			title: 'Cómo Adoptar',
			link: '/how-to-adopt',
		},
		{
			title: 'Galería',
			link: '/gallery',
		},
		{
			title: 'Contacto',
			link: '/contact',
		},
	];
}
