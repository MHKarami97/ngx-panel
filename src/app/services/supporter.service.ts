import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Supporter } from '../models/client/Supporter.module';

@Injectable({
  providedIn: 'root',
})
export class SupporterService {

  apiUrl = 'supporter/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  get(): Observable<Api<Supporter[]>> {
    return this.http.get<Api<Supporter[]>>(this.apiUrl + 'getall')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<Supporter[]>()),
        ));
  }

  getById(id: number): Observable<Api<Supporter>> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Api<Supporter>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Supporter>>(`getById id=${id}`)),
    );
  }

  delete(id: any): Observable<Api<Supporter>> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Api<Supporter>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Supporter>>('delete')),
    );
  }
}
