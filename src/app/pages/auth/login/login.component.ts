import { Component } from '@angular/core';
import {
	ReactiveFormsModule,
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { loginRequest } from './services/loginRequest';

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

	public loginError: string = '';

	get userName() {
		return this.loginForm.get('userName') as FormControl;
	}

	get password() {
		return this.loginForm.get('password') as FormControl;
	}

	public loginForm: FormGroup = this.fb.group({
		userName: ['ignacio', Validators.required],
		password: ['', Validators.required],
	});

	public login() {
		if (this.loginForm.valid) {
			this.loginService
				.login(this.loginForm.value as loginRequest)
				.subscribe({
					next: (response) => {
						console.log('Login exitoso', response);
					},
					error: (error) => {
						console.error('Error en el login', error);
						this.loginError = error;
					},
					complete: () => {
						console.info('Login completado');
						this.router.navigateByUrl('/');
						this.loginForm.reset();
					},
				});
		} else {
			console.log('Formulario inválido');
			this.loginForm.markAllAsTouched();
		}
	}
}
