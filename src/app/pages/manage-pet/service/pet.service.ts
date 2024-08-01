import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../model/pet';

interface State{
  //pets: Pet[];
  //loading: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class PetService {
  private baseUrl = 'http://localhost:8081/mascota';

  constructor(private http: HttpClient) { }

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.baseUrl}/listar`);
  }

  getPetById(id: number): Observable<Pet> {
    const url = `${this.baseUrl}/listar/${id}`;
    return this.http.get<Pet>(url);
  }

  createPet(pet: FormData): Observable<Pet> {
    return this.http.post<Pet>(`${this.baseUrl}/crear`, pet);
  }
 // createPet(pet: Pet): Observable<Pet> {
   // return this.http.post<Pet>(`${this.baseUrl}/crear`, pet);
  //}

  updatePet(id: number, pet: FormData): Observable<Pet> {
    return this.http.put<Pet>(`${this.baseUrl}/editar/${id}`, pet);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

 // getAllPets(): Observable<Pet[]> {
   // return this.http.get<Pet[]>(this.baseUrl);
 // }

  //getPetById(id: number): Observable<Pet> {
    //return this.http.get<Pet>(`${this.baseUrl}/${id}`);
  //}

  //createPet(pet: Pet): Observable<Pet> {
    //return this.http.post<Pet>(this.baseUrl, pet);
  //}

  //updatePet(id: number, pet: Pet): Observable<Pet> {
    //return this.http.put<Pet>(`${this.baseUrl}/${id}`, pet);
  //}

  //deletePet(id: number): Observable<void> {
   // return this.http.delete<void>(`${this.baseUrl}/${id}`);
  //}
}
