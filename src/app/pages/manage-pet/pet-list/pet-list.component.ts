import { Component, inject, OnInit } from '@angular/core';
import { Pet } from '../model/pet';
import { PetService } from '../service/pet.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PetCreateComponent } from '../pet-create/pet-create.component';
import { error } from 'node:console';



@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  providers: [PetService],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  public petService = inject(PetService);
  pets: Pet[] = [];

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.getAllPets().subscribe((data: Pet[]) => {
      this.pets = data;
    });
  }

  deletePet(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.petService.deletePet(id).subscribe(() => {
        this.pets = this.pets.filter(pet => pet.id !== id);
        this.reloadPage();
      }, error => {
        console.error('Error al eliminar la mascota:', error);
      });
    }
  }
  reloadPage(): void{
    location.reload();
  }
}
  // pets: Pet [] = [];
  // constructor(private petService: PetService) {}
  // ngOnInit(): void {
  //   this.loadPets();
  //   throw new Error('Method not implemented.');
  // }

  // loadPets(): void {
  //   this.petService.getAllPets().subscribe(data =>{
  //     this.pets = data;
  //   });
  // }

