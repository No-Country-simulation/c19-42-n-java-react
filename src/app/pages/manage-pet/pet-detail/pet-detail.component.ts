import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../service/pet.service';
import { Pet } from '../model/pet';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.css'
})
export class PetDetailComponent implements OnInit {
  pet: Pet | undefined;

  constructor(
    private route: ActivatedRoute, 
    private petService: PetService) { }

  ngOnInit(): void {
    this.getPetById();
  }

  getPetById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getPetById(id).subscribe(pet => this.pet = pet);
  }

}
