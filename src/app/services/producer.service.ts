import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Producer, ProducerCreate } from '../models/client/Producer.module';

@Injectable({
  providedIn: 'root',
})
export class ProducerService {

  apiUrl = 'producer/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  get(): Observable<Api<Producer[]>> {
    return this.http.get<Api<Producer[]>>(this.apiUrl + 'getall')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<Producer[]>()),
      ));
  }

  getById(id: number): Observable<Producer> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Producer>(url).pipe(
      tap(),
      catchError(this.handleError<Producer>(`getById id=${id}`)),
    );
  }

  create(product: ProducerCreate): Observable<Api<ProducerCreate>> {
    return this.http.post<Api<ProducerCreate>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<ProducerCreate>()),
    ));
  }

  update(id: number, product: ProducerCreate): Observable<any> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put(url, product).pipe(
      tap(),
      catchError(this.handleError<ProducerCreate>('update')),
    );
  }

  delete(id: any): Observable<Producer> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Producer>(url).pipe(
      tap(),
      catchError(this.handleError<Producer>('delete')),
    );
  }
}
