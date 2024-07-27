import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/AppSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shelter } from '../../interfaces/User';

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

	getShelterById(id: string): Observable<any> {
		return this.http.get<any>(`${this.baseURL}protectora/${id}`);
	}
}
