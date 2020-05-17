import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Standard, StandardCreate } from '../models/standard/Standard.module';

@Injectable({
  providedIn: 'root',
})
export class StandardService {

  apiUrl = 'standard/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  get(): Observable<Api<Standard[]>> {
    return this.http.get<Api<Standard[]>>(this.apiUrl + 'get')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<Standard[]>()),
      ));
  }

  getById(id: number): Observable<Api<Standard>> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Api<Standard>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Standard>>(`getById id=${id}`)),
    );
  }

  create(product: StandardCreate): Observable<Api<Standard>> {
    return this.http.post<Api<Standard>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<Standard>()),
    ));
  }

  update(id: number, product: StandardCreate): Observable<Api<Standard>> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put<Api<Standard>>(url, product).pipe(
      tap(),
      catchError(this.handleError<Api<Standard>>('update')),
    );
  }

  delete(id: any): Observable<Api<Standard>> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Api<Standard>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Standard>>('delete')),
    );
  }
}
