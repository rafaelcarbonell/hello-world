import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/models/employee';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/services/employees.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PetsService } from 'src/services/pets.service';

@Component({
  selector: 'app-manage-pet',
  templateUrl: './manage-pet.component.html'
})
export class ManagePetComponent implements OnInit {
  public employees: Employee[];
  public addForm: FormGroup;
  public managePetTitle: string;
  public editPet = null;

  constructor(private formBuilder: FormBuilder, private router: Router, public _employeesService: EmployeesService,
    public _petsService: PetsService) {
  }

  ngOnInit() {
    this.editPet = JSON.parse(window.localStorage.getItem("editPet"));
    this.getEmployees();

    if (this.editPet === null) {
      this.managePetTitle = "Add pet";
      this.addForm = this.formBuilder.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        employee: ['', Validators.required],
      });
    } else {
      this.managePetTitle = "Modify pet";
      this.addForm = this.formBuilder.group({
        name: [this.editPet.name, Validators.required],
        type: [this.editPet.type, Validators.required],
        employee: [this.editPet.employeeId, Validators.required]
      });
    }
  }

  getEmployees() {
    this._employeesService.getEmployees().subscribe(data => {
      this.employees = data;
    })
  }

  onSubmit() {
    this.addForm.value.employee = this.addForm.value.employee.toString();
    if (this.editPet === null) {
      this._petsService.createPet(this.addForm.value)
        .subscribe(data => {
          this.router.navigate(['pets']);
        });
    } else {
      this._petsService.updatePet(this.editPet.petId, this.addForm.value)
        .subscribe(data => {
          this.router.navigate(['pets']);
        });
    }
  }

}
