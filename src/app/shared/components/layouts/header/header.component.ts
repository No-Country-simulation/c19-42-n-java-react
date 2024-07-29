import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../../core/services/login.service';
@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, MatButtonModule],
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	isAuthenticated: boolean = false;
	username: string | null = null;

	constructor(private loginService: LoginService, private router: Router) {}

	ngOnInit(): void {
		this.loginService.getAuthStatus().subscribe((status) => {
			this.isAuthenticated = status;
			if (status && typeof window !== 'undefined') {
				this.username = localStorage.getItem('username');
			} else {
				this.username = null;
			}
		});
	}

	logout(): void {
		this.loginService.logout();
		this.router.navigateByUrl('/');
	}

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
