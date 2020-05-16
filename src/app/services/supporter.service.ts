import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Supporter, SupporterCreate } from '../models/client/Supporter.module';

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

  getById(id: number): Observable<Supporter> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Supporter>(url).pipe(
      tap(),
      catchError(this.handleError<Supporter>(`getById id=${id}`)),
    );
  }

  create(product: SupporterCreate): Observable<Api<SupporterCreate>> {
    return this.http.post<Api<SupporterCreate>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<SupporterCreate>()),
    ));
  }

  update(id: number, product: SupporterCreate): Observable<any> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put(url, product).pipe(
      tap(),
      catchError(this.handleError<SupporterCreate>('update')),
    );
  }

  delete(id: any): Observable<Supporter> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Supporter>(url).pipe(
      tap(),
      catchError(this.handleError<Supporter>('delete')),
    );
  }
}
