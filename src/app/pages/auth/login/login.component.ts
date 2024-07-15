import { Component } from '@angular/core';
import {
	ReactiveFormsModule,
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './login.component.html',
	styles: [
		`
			@media (width >= 992px) {
				.container {
					width: 45%;
				}
			}
		`,
	],
})
export class LoginComponent {
	constructor(private fb: FormBuilder) {}

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
			console.log('Formulario válido');
			console.log(this.loginForm.value);
		} else {
			console.log('Formulario inválido');
		}
	}
}
