import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../../core/services/auth/login.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	isAuthenticated: boolean = false;
	username: string | null = null;
	isShelter: boolean = false;
	shelter: any;

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

		const userPayload = this.loginService.getUserPayload();
		console.log(userPayload);
		console.log(userPayload?.role[0]);
		if (userPayload && userPayload.role[0].id === 3) {
			this.isShelter = true;
		}
	}

	goToProfile(): void {
		const userPayload = this.loginService.getUserPayload();
		if (userPayload) {
			this.router.navigateByUrl(`/shelter/${userPayload.id}`);
		}
	}

	logout(): void {
		this.loginService.logout();
		this.router.navigateByUrl('/');
	}

	public headerRoutes = [
		{
			title: 'Refugios',
			link: '/gallery',
		},
		{
			title: 'Adoptar',
			link: '/how-to-adopt',
		},
		{
			title: 'Contacto',
			link: '/contact',
		},
	];
}
