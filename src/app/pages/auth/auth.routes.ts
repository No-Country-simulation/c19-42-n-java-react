import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { loginGuard } from '../../core/guards/login.guard';

export const ROUTES_AUTH: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [loginGuard],
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [loginGuard],
	},
];
