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
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login.service';
import { Shelter, User } from '../../../core/interfaces/User';
import { Login } from '../../../core/interfaces/Login';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, JsonPipe],
	templateUrl: './register.component.html',
	styleUrls: ['/src/app/app.component.scss', '../auth.css'],
})
export class RegisterComponent {
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private loginService: LoginService
	) {}

	public formRole = 'adopter';

	get adopterFormRole() {
		return this.adopterForm.get('role') as FormControl;
	}

	get adopterFirstName() {
		return this.adopterForm.get('fullName.firstName') as FormControl;
	}

	get adopterLastName() {
		return this.adopterForm.get('fullName.lastName') as FormControl;
	}

	get adopterEmail() {
		return this.adopterForm.get('email') as FormControl;
	}

	get adopterUsername() {
		return this.adopterForm.get('username') as FormControl;
	}

	get adopterPassword() {
		return this.adopterForm.get('fullPassword.password') as FormControl;
	}

	get adopterBirthDate() {
		return this.adopterForm.get('birthDate') as FormControl;
	}

	get adopterPhoneNumber() {
		return this.adopterForm.get('phoneNumber') as FormControl;
	}

	get adopterAddressStreet() {
		return this.adopterForm.get('address.street') as FormControl;
	}

	get shelterFormRole() {
		return this.shelterForm.get('role') as FormControl;
	}

	get shelterName() {
		return this.shelterForm.get('shelterName') as FormControl;
	}

	get shelterEmail() {
		return this.shelterForm.get('email') as FormControl;
	}

	get shelterUsername() {
		return this.shelterForm.get('username') as FormControl;
	}

	get shelterPassword() {
		return this.shelterForm.get('fullPassword.password') as FormControl;
	}

	get shelterPhoneNumber() {
		return this.shelterForm.get('phoneNumber') as FormControl;
	}

	get shelterAddressCountry() {
		return this.shelterForm.get('address.country') as FormControl;
	}

	get shelterAddressState() {
		return this.shelterForm.get('address.state') as FormControl;
	}

	get shelterAddressCity() {
		return this.shelterForm.get('address.city') as FormControl;
	}

	get shelterAddressZipCode() {
		return this.shelterForm.get('address.zipCode') as FormControl;
	}

	get shelterAddressStreet() {
		return this.shelterForm.get('address.street') as FormControl;
	}

	calculateAge(birthdate: string): number {
		const birthDate = new Date(birthdate);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		const isBeforeBirthDate =
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthDate.getDate());

		if (isBeforeBirthDate) {
			age--;
		}
		return age;
	}

	public adopterForm: FormGroup = this.fb.group({
		role: ['adopter', [Validators.required, Validators.pattern('adopter')]],
		fullName: this.fb.group({
			firstName: [
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(40),
				],
			],
			lastName: [
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(40),
				],
			],
		}),
		email: ['', [Validators.required, Validators.email]],
		username: [
			'',
			[
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
			],
		],
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
		shelterName: [
			'',
			[
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
			],
		],
		email: ['', [Validators.required, Validators.email]],
		username: [
			'',
			[
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(20),
			],
		],
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
			country: ['Perú', Validators.required],
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

	private loginAfterRegister(login: Login) {
		this.loginService.login(login).subscribe({
			next: (response) => {
				if (response.token) {
					this.loginService.setToken(response.token, login.username);
					console.log('Login correcto', response.token);
					this.router.navigateByUrl('/');
				} else {
					console.error('Error en el login después del registro');
					alert('Error en el login después del registro');
				}
			},
			error: (error) => {
				console.error(
					'Error en la petición de login',
					error.message,
					error
				);
				alert('Error en la petición de login: ' + error.message);
			},
			complete: () => {
				console.info('Petición de login completada');
			},
		});
	}

	public registerAdopter() {
		if (this.adopterForm.valid) {
			console.log('Formulario válido', this.adopterForm.value);

			const edad = this.calculateAge(this.adopterBirthDate.value);

			const adopter: User = {
				nombres: this.adopterFirstName.value,
				apellidos: this.adopterLastName.value,
				email: this.adopterEmail.value,
				username: this.adopterUsername.value,
				password: this.adopterPassword.value,
				edad: edad,
				celular: this.adopterPhoneNumber.value,
				direccion: this.adopterAddressStreet.value,
			};

			this.loginService.registerAdopter(adopter).subscribe({
				next: (response) => {
					if (response) {
						console.log('Registro correcto', response);
						const login: Login = {
							username: adopter.username,
							password: adopter.password,
						};
						this.loginAfterRegister(login);
					} else {
						console.error('Error en el registro');
						alert('Error en el registro');
					}
				},
				error: (error) => {
					console.log('Error en la petición', error.message, error);
				},
				complete: () => {
					console.info('Petición completada');
					this.adopterForm.reset();
				},
			});
		} else {
			console.log('Formulario inválido');
		}
	}

	public registerShelter() {
		if (this.shelterForm.valid) {
			console.log('Formulario válido', this.shelterForm.value);

			const shelter: Shelter = {
				nombre: this.shelterName.value,
				email: this.shelterEmail.value,
				username: this.shelterUsername.value,
				password: this.shelterPassword.value,
				pais: this.shelterAddressCountry.value,
				provincia: this.shelterAddressState.value,
				ciudad: this.shelterAddressCity.value,
				codigoPostal: this.shelterAddressZipCode.value,
				direccion: this.shelterAddressStreet.value,
				celular: this.shelterPhoneNumber.value,
			};

			this.loginService.registerShelter(shelter).subscribe({
				next: (response) => {
					if (response) {
						console.log('Registro correcto', response);
						const login: Login = {
							username: shelter.username,
							password: shelter.password,
						};
						this.loginAfterRegister(login);
					} else {
						console.error('Error en el registro');
						alert('Error en el registro');
					}
				},
				error: (error) => {
					console.log('Error en la petición', error.message, error);
				},
				complete: () => {
					console.info('Petición completada');
					this.shelterForm.reset();
				},
			});
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
