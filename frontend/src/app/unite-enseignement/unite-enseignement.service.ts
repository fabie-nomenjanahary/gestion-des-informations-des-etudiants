import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UniteEnseignement } from './unite-enseignement.model';
const uniteEnseignementURL = 'http://localhost:8000/api/unite-enseignements/';

@Injectable({
  providedIn: 'root'
})
export class UniteEnseignementService {
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

  getAll(): Observable<UniteEnseignement[]>{
    return this.http.get<UniteEnseignement[]>(uniteEnseignementURL)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id: number): Observable<UniteEnseignement>{
    return this.http.get<UniteEnseignement>(uniteEnseignementURL + id)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  create(uniteEnseignement: UniteEnseignement): Observable<UniteEnseignement>{
    return this.http.post<UniteEnseignement>(uniteEnseignementURL, JSON.stringify(uniteEnseignement), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, uniteEnseignement: UniteEnseignement): Observable<UniteEnseignement>{
    return this.http.put<UniteEnseignement>(uniteEnseignementURL + id, JSON.stringify(uniteEnseignement), this.httpOptions)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number) {
    return this.http.delete<UniteEnseignement>(uniteEnseignementURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
}
