import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppSettings } from '../settings/AppSettings';
import { Shelter, User } from '../interfaces/User';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseLogin } from '../interfaces/ResponseLogin';
import { Login } from '../interfaces/Login';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	private http = inject(HttpClient);
	private baseUrl: string = AppSettings.apiURL;

	constructor() {}

	registerAdopter(user: User): Observable<ResponseLogin> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
		});

		return this.http
			.post<ResponseLogin>(
				`${this.baseUrl}auth/register/adoptante`,
				user,
				{ headers }
			)
			.pipe(catchError(this.handleError));
	}

	registerShelter(shelter: Shelter): Observable<ResponseLogin> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
		});

		return this.http
			.post<ResponseLogin>(
				`${this.baseUrl}auth/register/protectora`,
				shelter,
				{ headers }
			)
			.pipe(catchError(this.handleError));
	}

	login(user: Login): Observable<ResponseLogin> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
		});

		return this.http
			.post<ResponseLogin>(`${this.baseUrl}auth/login`, user, { headers })
			.pipe(catchError(this.handleError));
	}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('Ocurrió un error:', error.error.message);
		} else {
			console.error(
				`El backend retornó el código ${error.status}, ` +
					`el cuerpo del mensaje de error fue: ${error.error}`
			);
		}
		return throwError(
			'Algo malo ocurrió; por favor intenta de nuevo más tarde.'
		);
	}
}
