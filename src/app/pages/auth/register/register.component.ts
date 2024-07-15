import { Component } from '@angular/core';
import {
	ReactiveFormsModule,
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';
import { passwordValidator } from './password-validator';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './register.component.html',
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
export class RegisterComponent {
	constructor(private fb: FormBuilder) {}

	public registerForm: FormGroup = this.fb.group(
		{
			role: ['adopter', Validators.required],
			firstName: [null],
			lastName: [null],
			refugeName: [null],
			email: ['', [Validators.required, Validators.email]],
			userName: ['', Validators.required],
			password: [
				'',
				[
					Validators.required,
					Validators.pattern(
						'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,26}$'
					),
				],
			],
			confirmPassword: ['', Validators.required],
			birthDate: [null],
			phoneNumber: ['', Validators.required],
			country: ['', Validators.required],
			state: ['', Validators.required],
			city: ['', Validators.required],
			zipCode: [
				'',
				[Validators.required, Validators.pattern('^[0-9]{3,6}$')],
			],
			address: ['', Validators.required],
			terms: ['', [Validators.requiredTrue]],
		},
		{ validators: passwordValidator.passwordsMatch }
	);

	public register() {
		if (this.registerForm.valid) {
			console.log('Formulario válido', this.registerForm.value);
		} else {
			console.log('Formulario inválido');
		}
	}

	public resetAdopter() {
		this.registerForm.get('firstName')?.setValue(undefined);
		this.registerForm.get('lastName')?.setValue(undefined);
		this.registerForm.get('birthDate')?.setValue(undefined);
	}

	public resetRefuge() {
		this.registerForm.get('refugeName')?.setValue(null);
	}
}
