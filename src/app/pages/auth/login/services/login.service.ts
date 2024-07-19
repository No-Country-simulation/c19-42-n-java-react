import { Injectable } from '@angular/core';
import { loginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from './userInterface';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);
	currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
		id: 0,
		userName: '',
	});

	constructor(private http: HttpClient) {}

	login(_credentials: loginRequest): Observable<User> {
		return this.http.get<User>('/assets/data.json').pipe(
			tap((userData: User) => {
				this.currentUserLoginOn.next(true);
				this.currentUserData.next(userData);
			}),
			catchError(this.handleError)
		);
	}

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			console.error('Ocurrió un error', error.error.message);
		} else {
			console.error(
				`Backend retornó el código de estado: ${error.status}, ${error.error}`
			);
		}
		return throwError(
			() =>
				new Error(
					'Algo malo pasó; por favor, inténtalo de nuevo más tarde.'
				)
		);
	}

	get userData(): Observable<User> {
		return this.currentUserData.asObservable();
	}

	get userLoginOn(): Observable<boolean> {
		return this.currentUserLoginOn.asObservable();
	}
}
