import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enseignant } from './enseignant.model';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { Personne } from '../personne/personne.model';

const enseignantURL = 'http://localhost:8000/api/enseignants/';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
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

  getAll(): Observable<any[]>{
    return this.http.get<any[]>(enseignantURL)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id: number): Observable<Enseignant>{
    return this.http.get<Enseignant>(enseignantURL + id)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  create(personne: Personne, enseignant: Enseignant) {
    // console.log(JSON.stringify({'personne':personne,'enseignant':enseignant}));
    return this.http.post(enseignantURL, JSON.stringify({'personne':personne,'enseignant':enseignant}), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number,personne: Personne, enseignant: Enseignant): Observable<Enseignant>{
    return this.http.put<Enseignant>(enseignantURL + id, JSON.stringify({'personne':personne,'enseignant':enseignant}), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number) {
    return this.http.delete<Enseignant>(enseignantURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
}
