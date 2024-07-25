import { Component } from '@angular/core';
import {
	ReactiveFormsModule,
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';
import { Login } from '../../../core/interfaces/Login';
import { LoginService } from '../../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule],
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
		userName: ['ignacioadoptante', Validators.required],
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
						localStorage.setItem('token', response.token);
						console.log('Login correcto', response.token);
						this.router.navigateByUrl('/');
					} else {
						console.error('Usuario o contraseña incorrectos');
						this.loginErrorMessage =
							'Usuario o contraseña incorrectos';
					}
				},
				error: (error) => {
					console.error('Error en la petición', error.message, error);
					(this.loginErrorMessage = 'Error en la petición'),
						error.message;
				},
				complete: () => {
					console.info('Petición completada');
					this.loginForm.reset();
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
