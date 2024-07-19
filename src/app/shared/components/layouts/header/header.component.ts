import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../../pages/auth/login/services/login.service';
import { User } from '../../../../pages/auth/login/services/userInterface';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, RouterLinkActive],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css', '/src/app/app.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	userLoginOn: boolean = false;
	userData?: User;
	constructor(private loginService: LoginService) {}

	ngOnInit(): void {
		this.loginService.currentUserLoginOn.subscribe({
			next: (userLoginOn) => {
				this.userLoginOn = userLoginOn;
			},
		});

		this.loginService.currentUserData.subscribe({
			next: (userData) => {
				this.userData = userData;
			},
		});
	}

	ngOnDestroy() {
		this.loginService.currentUserLoginOn.unsubscribe();
		this.loginService.currentUserData.unsubscribe();
	}

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
