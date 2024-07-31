import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/AppSettings';
import { Observable } from 'rxjs';
import { Pet } from '../../interfaces/Pet';

@Injectable({
	providedIn: 'root',
})
export class HomeService {
	private baseURL: string = AppSettings.apiURL;

	constructor(private http: HttpClient) {}

	getRecentPets(): Observable<Pet[]> {
		return this.http.get<Pet[]>(`${this.baseURL}mascota/ultimas`);
	}
}
