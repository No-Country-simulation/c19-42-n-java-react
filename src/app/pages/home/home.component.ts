import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../auth/login/services/login.service';
import { User } from '../auth/login/services/userInterface';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
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
}
