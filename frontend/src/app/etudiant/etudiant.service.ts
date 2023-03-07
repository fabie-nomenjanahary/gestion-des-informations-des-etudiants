import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etudiant } from './etudiant.model';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { Personne } from '../personne/personne.model';

const etudiantURL = 'http://localhost:8000/api/etudiants/';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
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
    return this.http.get<any[]>(etudiantURL)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id: number): Observable<Etudiant>{
    return this.http.get<Etudiant>(etudiantURL + id)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  create(personne: Personne, etudiant: Etudiant) {
    // console.log(JSON.stringify({'personne':personne,'etudiant':etudiant}));
    return this.http.post(etudiantURL, JSON.stringify({'personne':personne,'etudiant':etudiant}), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number,personne: Personne, etudiant: Etudiant): Observable<Etudiant>{
    return this.http.put<Etudiant>(etudiantURL + id, JSON.stringify({'personne':personne,'etudiant':etudiant}), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number) {
    return this.http.delete<Etudiant>(etudiantURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
}
