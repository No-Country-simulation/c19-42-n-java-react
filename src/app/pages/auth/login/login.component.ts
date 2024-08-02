import { Component } from '@angular/core';
import {
	ReactiveFormsModule,
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';
import { Login } from '../../../core/interfaces/Login';
import { LoginService } from '../../../core/services/auth/login.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, MatCardModule],
	templateUrl: './login.component.html',
	styleUrls: ['/src/app/app.component.scss', '../auth.css'],
})
export class LoginComponent {
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private loginService: LoginService
	) {}

	public loginErrorMessage: string = '';

	get userName() {
		return this.loginForm.get('userName') as FormControl;
	}

	get password() {
		return this.loginForm.get('password') as FormControl;
	}

	public loginForm: FormGroup = this.fb.group({
		userName: ['', Validators.required],
		password: ['', Validators.required],
	});

	public login() {
		if (this.loginForm.valid) {
			const login: Login = {
				username: this.userName.value,
				password: this.password.value,
			};

			this.loginService.login(login).subscribe({
				next: (response) => {
					if (response.token) {
						this.loginService.setToken(
							response.token,
							login.username
						);
						console.log('Login correcto', response.token);
						this.router.navigateByUrl('/');
						this.loginForm.reset();
					} else {
						console.error('Usuario o contraseña incorrectos');
						this.loginErrorMessage =
							'Usuario o contraseña incorrectos';
						alert(this.loginErrorMessage);
					}
				},
				error: (error) => {
					if (error.status === 400) {
						console.error('Usuario no registrado', error);
						this.loginErrorMessage =
							'Usuario no registrado o contraseña incorrecta';
						alert(this.loginErrorMessage);
					} else {
						console.error(
							'Error en la petición',
							error.message,
							error
						);
						this.loginErrorMessage =
							'Error en la petición: ' + error.message;
						alert(this.loginErrorMessage);
					}
				},
				complete: () => {
					console.info('Petición completada');
				},
			});
		} else {
			console.log('Formulario inválido');
			this.loginForm.markAllAsTouched();
		}
	}

	public register() {
		this.router.navigateByUrl('/auth/register');
	}
}
