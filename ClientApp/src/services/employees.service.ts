import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Employee } from 'src/models/employee';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

    constructor(private http: HttpClient,@Inject('BASE_URL') private apiURL: string) { }
    
    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }  
  
    // HttpClient API get() method => Fetch employees list
    getEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(this.apiURL + 'employees')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
  
    // HttpClient API get() method => Fetch employee
    getEmployee(id): Observable<Employee> {
      return this.http.get<Employee>(this.apiURL + 'employees/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }  
  
    // HttpClient API post() method => Create employee
    createEmployee(employee): Observable<Employee> {
      return this.http.post<Employee>(this.apiURL + 'employees', JSON.stringify(employee), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }  
  
    // HttpClient API put() method => Update employee
    updateEmployee(employeeId, employee): Observable<Employee> {
      return this.http.put<Employee>(this.apiURL + 'employees/edit/' + employeeId, JSON.stringify(employee), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
  
    // HttpClient API delete() method => Delete employee
    deleteEmployee(employeeId){
      return this.http.delete<Employee>(this.apiURL + 'employees/' + employeeId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
  
    // Error handling 
    handleError(error) {
       let errorMessage = '';
       if(error.error instanceof ErrorEvent) {
         // Get client-side error
         errorMessage = error.error.message;
       } else {
         // Get server-side error
         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
       }
       window.alert(errorMessage);
       return throwError(errorMessage);
    }

}
