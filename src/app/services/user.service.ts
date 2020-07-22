import { User, UserCreate } from './../models/user/user.module';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  apiUrl = 'user/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  get(): Observable<Api<User[]>> {
    return this.http.get<Api<User[]>>(this.apiUrl + 'get')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<User[]>()),
        ));
  }

  getById(id: number): Observable<Api<User>> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Api<User>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<User>>(`getById id=${id}`)),
    );
  }

  create(product: UserCreate): Observable<Api<User>> {
    return this.http.post<Api<User>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<User>()),
      ));
  }

  update(id: number, product: UserCreate): Observable<Api<User>> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put<Api<User>>(url, product).pipe(
      tap(),
      catchError(this.handleError<Api<User>>('update')),
    );
  }

  delete(id: any): Observable<Api<User>> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Api<User>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<User>>('delete')),
    );
  }
}
