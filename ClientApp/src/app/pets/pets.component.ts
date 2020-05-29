import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/models/pet';
import { PetsService } from 'src/services/pets.service';
import { Router } from '@angular/router';
import { Employee } from 'src/models/employee';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html'
})
export class PetsComponent implements OnInit {
  public pets: Pet[];

  constructor(private router: Router, public _petsService: PetsService) {
  }

  ngOnInit(){
    this.getPets();
  }

  getPets() {
    this._petsService.getPets().subscribe(data => {
      this.pets = data;
    })
  }

  deletePet(petId: any) {
    this._petsService.deletePet(petId).subscribe(data => {
      this.pets = this.pets.filter(e => e.petId !== petId);
    })
  }

  addPet(): void {
    window.localStorage.removeItem("editPet");
    this.router.navigate(['add-pet']);
  };

  modifyPet(pet: Pet): void {
    window.localStorage.removeItem("editPet");
    window.localStorage.setItem("editPet", JSON.stringify(pet));
    this.router.navigate(['add-pet']);  
  };
  
}
