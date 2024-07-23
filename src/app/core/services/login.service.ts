import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppSettings } from '../settings/AppSettings';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../interfaces/ResponseLogin';
import { Login } from '../interfaces/Login';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	private http = inject(HttpClient);
	private baseUrl: string = AppSettings.apiURL;

	constructor() {}

	register(user: User): Observable<ResponseLogin> {
		return this.http.post<ResponseLogin>(
			`${this.baseUrl}auth/register`,
			user
		);
	}

	login(user: Login): Observable<ResponseLogin> {
		return this.http.post<ResponseLogin>(`${this.baseUrl}auth/login`, user);
	}
}
