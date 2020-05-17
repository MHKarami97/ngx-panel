import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Price, PriceCreate } from '../models/price/Price.module';

@Injectable({
  providedIn: 'root',
})
export class PriceService {

  apiUrl = 'price/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  get(): Observable<Api<Price[]>> {
    return this.http.get<Api<Price[]>>(this.apiUrl + 'get')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<Price[]>()),
      ));
  }

  getById(id: number): Observable<Api<Price>> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Api<Price>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Price>>(`getById id=${id}`)),
    );
  }

  create(product: PriceCreate): Observable<Api<Price>> {
    return this.http.post<Api<Price>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<Price>()),
    ));
  }

  update(id: number, product: PriceCreate): Observable<Api<Price>> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put<Api<Price>>(url, product).pipe(
      tap(),
      catchError(this.handleError<Api<Price>>('update')),
    );
  }

  delete(id: any): Observable<Api<Price>> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Api<Price>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Price>>('delete')),
    );
  }
}
