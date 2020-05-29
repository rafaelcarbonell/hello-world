import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/services/employees.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html'
})
export class ManageEmployeeComponent implements OnInit {
  public addForm: FormGroup;
  public manageEmployeeTitle: string;
  public editEmployee = null;

  constructor(private formBuilder: FormBuilder,private router: Router, public _employeesService: EmployeesService) { }

  ngOnInit() {
    this.editEmployee = JSON.parse(window.localStorage.getItem("editEmployee"));
    if(this.editEmployee === null){
      this.manageEmployeeTitle = "Add employee";
      this.addForm = this.formBuilder.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        mediaInteractiva: [false, Validators.required]
      });
    }else{
      this.manageEmployeeTitle = "Modify employee";
      this.addForm = this.formBuilder.group({
        name: [this.editEmployee.name, Validators.required],
        lastName: [this.editEmployee.lastName, Validators.required],
        mediaInteractiva: [this.editEmployee.mediaInteractiva, Validators.required]
      });
    }
  }

  onSubmit() {
      if(this.editEmployee === null){
        this._employeesService.createEmployee(this.addForm.value)
        .subscribe( data => {
          this.router.navigate(['employees']);
        });
      }else{
        this._employeesService.updateEmployee(this.editEmployee.employeeId,this.addForm.value)
        .subscribe( data => {
          this.router.navigate(['employees']);
        });
      }
  }

}
