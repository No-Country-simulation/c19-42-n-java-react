import { Component } from '@angular/core';
import {
	ReactiveFormsModule,
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';
import { passwordValidator } from './password-validator';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, JsonPipe],
	templateUrl: './register.component.html',
	styleUrls: ['/src/app/app.component.scss', '../auth.css'],
})
export class RegisterComponent {
	constructor(private fb: FormBuilder) {}

	public formRole = 'adopter';

	get adopterFormRole() {
		return this.adopterForm.get('role') as FormControl;
	}

	get shelterFormRole() {
		return this.shelterForm.get('role') as FormControl;
	}

	public adopterForm: FormGroup = this.fb.group({
		role: ['adopter', [Validators.required, Validators.pattern('adopter')]],
		fullName: this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
		}),
		email: ['', [Validators.required, Validators.email]],
		username: ['', Validators.required],
		fullPassword: this.fb.group(
			{
				password: [
					'',
					[
						Validators.required,
						Validators.pattern(
							'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*-/])[A-Za-z\\d!@#$%^&*-/]{8,}$'
						),
					],
				],
				confirmPassword: ['', Validators.required],
			},
			{ validators: passwordValidator.passwordsMatch }
		),
		birthDate: ['', Validators.required],
		phoneNumber: ['', Validators.required],
		address: this.fb.group({
			country: [''],
			state: [''],
			city: [''],
			zipCode: [''],
			street: ['', Validators.required],
		}),
		terms: ['', [Validators.requiredTrue]],
	});

	public shelterForm: FormGroup = this.fb.group({
		role: ['shelter', [Validators.required, Validators.pattern('shelter')]],
		shelterName: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		username: ['', Validators.required],
		fullPassword: this.fb.group(
			{
				password: [
					'',
					[
						Validators.required,
						Validators.pattern(
							'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*-/])[A-Za-z\\d!@#$%^&*-/]{8,}$'
						),
					],
				],
				confirmPassword: ['', Validators.required],
			},
			{ validators: passwordValidator.passwordsMatch }
		),
		phoneNumber: ['', Validators.required],
		address: this.fb.group({
			country: ['', Validators.required],
			state: ['', Validators.required],
			city: ['', Validators.required],
			zipCode: ['', Validators.required],
			street: ['', Validators.required],
		}),
		terms: ['', [Validators.requiredTrue]],
	});

	public reset() {
		this.adopterForm.reset();
		this.shelterForm.reset();
	}

	public changeFormRole(role: string) {
		this.formRole = role;
		this.reset();
		this.adopterFormRole.setValue('adopter');
		this.shelterFormRole.setValue('shelter');
	}

	public registerAdopter() {
		if (this.adopterForm.valid) {
			console.log('Formulario válido', this.adopterForm.value);
		} else {
			console.log('Formulario inválido');
		}
	}

	public registerShelter() {
		if (this.shelterForm.valid) {
			console.log('Formulario válido', this.shelterForm.value);
		} else {
			console.log('Formulario inválido', this.shelterForm.value);
		}
	}

	public register() {
		if (this.formRole === 'adopter') {
			this.registerAdopter();
		} else {
			this.registerShelter();
		}
	}
}
