import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Niveau } from './niveau.model';

const niveauURL = 'http://localhost:8000/api/niveaux/';


@Injectable({
  providedIn: 'root'
})
export class NiveauService {
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
  
  getAll(): Observable<Niveau[]>{
    return this.http.get<Niveau[]>(niveauURL)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id: number): Observable<Niveau>{
    return this.http.get<Niveau>(niveauURL + id)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  create(niveau: Niveau): Observable<Niveau>{
    return this.http.post<Niveau>(niveauURL, JSON.stringify(niveau), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, niveau: Niveau): Observable<Niveau>{
    return this.http.put<Niveau>(niveauURL + id, JSON.stringify(niveau), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number) {
    return this.http.delete<Niveau>(niveauURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
}
