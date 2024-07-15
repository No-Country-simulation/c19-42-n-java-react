import { Component } from '@angular/core';
import {
	ReactiveFormsModule,
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';

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
	public isAdopter: boolean = true;

	constructor(private fb: FormBuilder) {}

	public registerForm: FormGroup = this.fb.group({
		firstName: [''],
		lastName: [''],
		refugeName: [''],
		email: ['', [Validators.required, Validators.email]],
		userName: ['', Validators.required],
		password: ['', Validators.required],
		confirmPassword: ['', Validators.required],
		birthDate: [''],
		phoneNumber: ['', Validators.required],
		country: ['', Validators.required],
		state: ['', Validators.required],
		city: ['', Validators.required],
		zipCode: ['', Validators.required],
		address: ['', Validators.required],
		terms: ['', [Validators.required]],
	});
}
