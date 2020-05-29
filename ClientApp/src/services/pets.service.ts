import { Injectable, Inject } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Pet } from 'src/models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  
  constructor(private http: HttpClient,@Inject('BASE_URL') private apiURL: string) { }
    
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch pets list
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiURL + 'pets')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch pet
  getPet(id): Observable<Pet> {
    return this.http.get<Pet>(this.apiURL + 'pets/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create pet
  createPet(pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiURL + 'pets', JSON.stringify(pet), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update pet
  updatePet(petId, pet): Observable<Pet> {
    return this.http.put<Pet>(this.apiURL + 'pets/edit' + petId, JSON.stringify(pet), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  // HttpClient API delete() method => Delete pet
  deletePet(petId){
    return this.http.delete<Pet>(this.apiURL + 'pets/' + petId, this.httpOptions)
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
