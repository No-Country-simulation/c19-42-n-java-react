import { afterNextRender, Component } from '@angular/core';
import {
	ReactiveFormsModule,
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
} from '@angular/forms';
import { passwordValidator } from './password-validator';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './register.component.html',
	styleUrls: ['../auth.css'],
})
export class RegisterComponent {
	constructor(private fb: FormBuilder) {
		afterNextRender(() => {
			const savedRole = localStorage.getItem('role');
			if (savedRole) {
				this.registerForm.get('role')?.setValue(savedRole);
			}
			this.registerForm.get('role')?.valueChanges.subscribe((value) => {
				localStorage.setItem('role', value);
			});
		});
	}

	get role() {
		return this.registerForm.get('role') as FormControl;
	}

	get firstName() {
		return this.registerForm.get('firstName') as FormControl;
	}

	get lastName() {
		return this.registerForm.get('lastName') as FormControl;
	}

	get birthDate() {
		return this.registerForm.get('birthDate') as FormControl;
	}

	get refugeName() {
		return this.registerForm.get('refugeName') as FormControl;
	}

	get country() {
		return this.registerForm.get('country') as FormControl;
	}

	get state() {
		return this.registerForm.get('state') as FormControl;
	}

	get city() {
		return this.registerForm.get('city') as FormControl;
	}

	get zipCode() {
		return this.registerForm.get('zipCode') as FormControl;
	}

	get address() {
		return this.registerForm.get('address') as FormControl;
	}

	public registerForm: FormGroup = this.fb.group(
		{
			role: ['', Validators.required],
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
						'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*-/])[A-Za-z\\d!@#$%^&*-/]{8,}$'
					),
				],
			],
			confirmPassword: ['', Validators.required],
			birthDate: [null],
			codeCountry: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			country: ['', Validators.required],
			state: ['', Validators.required],
			city: ['', Validators.required],
			zipCode: ['', [Validators.pattern('^[0-9]{3,6}$')]],
			address: ['', Validators.required],
			terms: ['', [Validators.requiredTrue]],
		},
		{ validators: passwordValidator.passwordsMatch }
	);

	public reset() {
		this.firstName.setValue(null);
		this.lastName.setValue(null);
		this.birthDate.setValue(null);
		this.refugeName.setValue(null);
	}

	public register() {
		if (this.registerForm.valid) {
			console.log('Formulario válido', this.registerForm.value);
		} else {
			console.log('Formulario inválido');
		}
	}
}
