import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Matiere } from './matiere.model';
const matiereURL = 'http://localhost:8000/api/matieres/';
@Injectable({
  providedIn: 'root'
})
export class MatiereService {
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

  getAll(): Observable<Matiere[]>{
    return this.http.get<Matiere[]>(matiereURL)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id: number): Observable<Matiere>{
    return this.http.get<Matiere>(matiereURL + id)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  create(matiere: Matiere): Observable<Matiere>{
    return this.http.post<Matiere>(matiereURL, JSON.stringify(matiere), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, matiere: Matiere): Observable<Matiere>{
    return this.http.put<Matiere>(matiereURL + id, JSON.stringify(matiere), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number) {
    return this.http.delete<Matiere>(matiereURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
}
