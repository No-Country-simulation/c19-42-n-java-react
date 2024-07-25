import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { title } from 'process';
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
			title: 'Galería',
			link: '/gallery',
		},
		{
			title: 'Adoptar',
			link: '/how-to-adopt',
		},
		{
			title: 'Donar',
			link: '/donate',
		},
		{
			title: 'Contacto',
			link: '/contact',
		},
	];
}
