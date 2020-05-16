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

  getById(id: number): Observable<Standard> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Standard>(url).pipe(
      tap(),
      catchError(this.handleError<Standard>(`getById id=${id}`)),
    );
  }

  create(product: StandardCreate): Observable<Api<StandardCreate>> {
    return this.http.post<Api<StandardCreate>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<StandardCreate>()),
    ));
  }

  update(id: number, product: StandardCreate): Observable<any> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put(url, product).pipe(
      tap(),
      catchError(this.handleError<StandardCreate>('update')),
    );
  }

  delete(id: any): Observable<Standard> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Standard>(url).pipe(
      tap(),
      catchError(this.handleError<Standard>('delete')),
    );
  }
}
