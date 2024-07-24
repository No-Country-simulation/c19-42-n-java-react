import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pet } from '../model/pet';

@Injectable({
  providedIn: 'root'
})
export class MockPetService {
  private pets: Pet[] = [];

  constructor() {}

 // getAllPets(): Observable<Pet[]> {
    //return of(this.pets);
  }

 // getPetById(id: number): Observable<Pet> {
   // const pet = this.pets.find(p => p.id === id) || null;
    //return of(pet);
  //}

  //createPet(pet: Pet): Observable<Pet> {
    //this.pets.push(pet);
    //return of(pet);
 // }

  //updatePet(id: number, pet: Pet): Observable<Pet> {
    //const index = this.pets.findIndex(p => p.id === id);
    //if (index !== -1) {
     // this.pets[index] = pet;
    //}
   // return of(pet);
 // }

  //deletePet(id: number): Observable<void> {
  //  this.pets = this.pets.filter(p => p.id !== id);
  //  return of();
 // }
//}
