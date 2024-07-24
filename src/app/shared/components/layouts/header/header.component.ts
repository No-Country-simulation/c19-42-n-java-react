import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, MatButtonModule],
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	constructor() {}

	public headerRoutes = [
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
