import { Component, inject, OnInit } from '@angular/core';
import { Pet } from '../model/pet';
import { PetService } from '../service/pet.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule],
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
    this.petService.getAllPets().subscribe(data => {
      this.pets = data;
    });
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

