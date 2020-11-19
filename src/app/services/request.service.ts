import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Request } from '../models/request/Request.module';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  apiUrl = 'request/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  getCustom(type: number): Observable<Api<Request[]>> {
    const url = `${this.apiUrl}getCustom/${type}`;
    return this.http.get<Api<Request[]>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Request[]>>(`getById id=${type}`)),
    );
  }

  getCustomAdmin(type: number): Observable<Api<Request[]>> {
    const url = `${this.apiUrl}getCustomAdmin/${type}`;
    return this.http.get<Api<Request[]>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Request[]>>(`getById id=${type}`)),
    );
  }

  create(product: Request): Observable<Api<Request>> {
    return this.http.post<Api<Request>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<Request>()),
    ));
  }

  active(id: number): Observable<Api<Request>> {
    const url = `${this.apiUrl}active/${id}`;
    return this.http.get<Api<Request>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Request>>(`active id=${id}`)),
    );
  }

  update(id: number, product: Request): Observable<Api<Request>> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put<Api<Request>>(url, product).pipe(
      tap(),
      catchError(this.handleError<Api<Request>>('update')),
    );
  }

  delete(id: any): Observable<Api<Request>> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Api<Request>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Request>>('delete')),
    );
  }
}
