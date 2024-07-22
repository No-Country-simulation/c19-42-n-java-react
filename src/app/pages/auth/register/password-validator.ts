import { FormGroup } from '@angular/forms';

export class passwordValidator {
	static passwordsMatch(formGroup: FormGroup) {
		const password = formGroup.get('password')?.value;
		const confirmPassword = formGroup.get('confirmPassword')?.value;

		if (password !== confirmPassword) {
			formGroup
				.get('confirmPassword')
				?.setErrors({ passwordsMismatch: true });
			return { passwordsMismatch: true };
		} else {
			return null;
		}
	}
}
