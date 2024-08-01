import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/AppSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shelter } from '../../interfaces/User';
import { Pet } from '../../interfaces/Pet';

@Injectable({
	providedIn: 'root',
})
export class GalleryService {
	private baseURL: string = AppSettings.apiURL;

	constructor(private http: HttpClient) {}

	getShelters(): Observable<Shelter[]> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
		});

		return this.http.get<Shelter[]>(`${this.baseURL}protectora`, {
			headers,
		});
	}

	getShelterById(id: string): Observable<Shelter> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
		});

		return this.http.get<Shelter>(`${this.baseURL}protectora/${id}`, {
			headers,
		});
	}

	getPetsByShelterId(shelterId: string): Observable<Pet[]> {
		return this.http.get<Pet[]>(
			`${this.baseURL}protectora/mascotas/${shelterId}`
		);
	}

	getPetById(id: string): Observable<Pet> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
		});

		return this.http.get<Pet>(`${this.baseURL}mascota/listar/${id}`, {
			headers,
		});
	}
}
