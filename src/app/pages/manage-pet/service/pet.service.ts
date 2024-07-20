import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../model/pet';

interface State{
  pets: Pet[];
  loading: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class PetService {
  #state = signal<State>({
    loading: true,
    pets:[],
  });
  private apiUrl = `http://localhost:4200/manage-pet/list`;
  
  constructor(private http: HttpClient){
    console.log('Cargando data');
  }

  

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }
}
