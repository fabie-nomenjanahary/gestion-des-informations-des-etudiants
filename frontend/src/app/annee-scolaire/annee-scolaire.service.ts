import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AnneeScolaire } from './annee-scolaire.model';
const anneeScolaireURL = 'http://localhost:8000/api/annee-scolaires/';

@Injectable({
  providedIn: 'root'
})
export class AnneeScolaireService {
  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
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

  getAll(): Observable<AnneeScolaire[]>{
    return this.http.get<AnneeScolaire[]>(anneeScolaireURL)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id: number): Observable<AnneeScolaire>{
    return this.http.get<AnneeScolaire>(anneeScolaireURL + id)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  create(anneeScolaire: AnneeScolaire):Observable<AnneeScolaire> {
    return this.http.post<AnneeScolaire>(anneeScolaireURL, JSON.stringify(anneeScolaire), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, anneeScolaire: AnneeScolaire): Observable<AnneeScolaire>{
    return this.http.put<AnneeScolaire>(anneeScolaireURL + id, JSON.stringify(anneeScolaire), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number) {
    return this.http.delete<AnneeScolaire>(anneeScolaireURL + id, this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }
}
