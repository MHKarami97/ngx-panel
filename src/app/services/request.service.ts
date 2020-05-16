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

  getCustom(tpye: number): Observable<Request> {
    const url = `${this.apiUrl}getcustom/${tpye}`;
    return this.http.get<Request>(url).pipe(
      tap(),
      catchError(this.handleError<Request>(`getById id=${tpye}`)),
    );
  }

  create(product: Request): Observable<Api<Request>> {
    return this.http.post<Api<Request>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<Request>()),
    ));
  }

  update(id: number, product: Request): Observable<any> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put(url, product).pipe(
      tap(),
      catchError(this.handleError<Request>('update')),
    );
  }

  delete(id: any): Observable<Request> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Request>(url).pipe(
      tap(),
      catchError(this.handleError<Request>('delete')),
    );
  }
}
