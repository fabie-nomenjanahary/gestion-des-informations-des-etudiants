import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etudiant } from './etudiant.model';
import { catchError, Observable, pipe, throwError } from 'rxjs';

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
  
  getAll(): Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>(etudiantURL)
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

  create(etudiant: Etudiant): Observable<Etudiant>{
    return this.http.post<Etudiant>(etudiantURL, JSON.stringify(etudiant), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, etudiant: Etudiant): Observable<Etudiant>{
    return this.http.put<Etudiant>(etudiantURL + id, JSON.stringify(etudiant), this.httpOptions)
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
