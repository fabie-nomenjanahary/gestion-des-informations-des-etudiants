import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Parcour } from './parcour.model';

const parcourURL = 'http://localhost:8000/api/parcours/';

@Injectable({
  providedIn: 'root'
})
export class ParcourService {
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
  
  getAll(): Observable<Parcour[]>{
    return this.http.get<Parcour[]>(parcourURL)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id: number): Observable<Parcour>{
    return this.http.get<Parcour>(parcourURL + id)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  create(parcour: Parcour): Observable<Parcour>{
    return this.http.post<Parcour>(parcourURL, JSON.stringify(parcour), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, parcour: Parcour): Observable<Parcour>{
    return this.http.put<Parcour>(parcourURL + id, JSON.stringify(parcour), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number) {
    return this.http.delete<Parcour>(parcourURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
}
