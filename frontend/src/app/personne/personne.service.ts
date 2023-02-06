import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Personne } from './personne.model';

const personneURL = 'http://localhost:8000/api/personnes/';

@Injectable({
  providedIn: 'root'
})
export class PersonneService {
 httpOptions = {
    headers: new HttpHeaders({
      'Accept':'application/json',
      'Content-Type':'application/json'
    })
  }

  constructor(private http: HttpClient) { }
  
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  
  getAll(): Observable<Personne[]>{
    return this.http.get<Personne[]>(personneURL)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id: number): Observable<Personne>{
    return this.http.get<Personne>(personneURL + id)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  create(personne: Personne): Observable<Personne>{
    return this.http.post<Personne>(personneURL, JSON.stringify(personne), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, personne: Personne): Observable<Personne>{
    return this.http.put<Personne>(personneURL + id, JSON.stringify(personne), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number) {
    return this.http.delete<Personne>(personneURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
}
