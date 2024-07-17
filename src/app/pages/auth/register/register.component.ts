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
	styleUrls: ['/src/app/app.component.scss', '../auth.css'],
})
export class RegisterComponent {
	constructor(private fb: FormBuilder) {
		afterNextRender(() => {
			const savedRole = localStorage.getItem('role');
			if (savedRole) {
				this.role.setValue(savedRole);
			}
			this.role.valueChanges.subscribe((value) => {
				localStorage.setItem('role', value);
			});
		});
	}

	get role() {
		return this.registerForm.get('role') as FormControl;
	}

	get firstName() {
		return this.registerForm.get('fullName.firstName') as FormControl;
	}

	get lastName() {
		return this.registerForm.get('fullName.lastName') as FormControl;
	}

	get birthDate() {
		return this.registerForm.get('birthDate') as FormControl;
	}

	get refugeName() {
		return this.registerForm.get('refugeName') as FormControl;
	}

	get country() {
		return this.registerForm.get('address.country') as FormControl;
	}

	get state() {
		return this.registerForm.get('address.state') as FormControl;
	}

	get city() {
		return this.registerForm.get('address.city') as FormControl;
	}

	get zipCode() {
		return this.registerForm.get('address.zipCode') as FormControl;
	}

	get street() {
		return this.registerForm.get('address.street') as FormControl;
	}

	public registerForm: FormGroup = this.fb.group({
		role: ['', Validators.required],
		fullName: this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
		}),
		refugeName: [''],
		email: ['', [Validators.required, Validators.email]],
		userName: ['', Validators.required],
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
		birthDate: [''],
		codeCountry: ['', Validators.required],
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
		this.firstName.reset();
		this.lastName.reset();
		this.birthDate.reset();
		this.refugeName.reset();
	}

	public register() {
		if (this.registerForm.valid) {
			console.log('Formulario válido', this.registerForm.value);
		} else {
			console.log('Formulario inválido');
		}
	}
}
