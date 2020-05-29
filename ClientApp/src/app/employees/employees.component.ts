import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/services/employees.service';
import { Employee } from 'src/models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  public employees: Employee[];

  constructor(private router: Router, public _employeesService: EmployeesService) {
  }

  ngOnInit(){
    this.getEmployees();
  }

  getEmployees() {
    this._employeesService.getEmployees().subscribe(data => {
      this.employees = data;
    })
  }

  deleteEmployee(employeeId: any) {
    this._employeesService.deleteEmployee(employeeId).subscribe((data: {}) => {
      this.employees = this.employees.filter(e => e.employeeId !== employeeId);
    })
  }

  addEmployee(): void {
    window.localStorage.removeItem("editEmployee");
    this.router.navigate(['add-employee']);
  };

  modifyEmployee(employee: Employee): void {
    window.localStorage.removeItem("editEmployee");
    window.localStorage.setItem("editEmployee", JSON.stringify(employee));
    this.router.navigate(['add-employee']);  
  };
}

