import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Pin, PinCreate } from '../models/more/pin.module';

@Injectable({
  providedIn: 'root',
})
export class PinService {

  apiUrl = 'pin/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.error.next(error.message);
      return throwError(error);
    };
  }

  get(): Observable<Api<Pin[]>> {
    return this.http.get<Api<Pin[]>>(this.apiUrl + 'get')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<Pin[]>()),
        ));
  }

  create(product: PinCreate): Observable<Api<Pin>> {
    return this.http.post<Api<Pin>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<Pin>()),
      ));
  }

  delete(id: any): Observable<Api<Pin>> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Api<Pin>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Pin>>('delete')),
    );
  }
}
