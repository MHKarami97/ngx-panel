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

  apiUrl= 'banner/';
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

  getById(id: number): Observable<User> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<User>(url).pipe(
      tap(),
      catchError(this.handleError<User>(`getById id=${id}`)),
    );
  }

  create(product: UserCreate): Observable<Api<UserCreate>> {
    return this.http.post<Api<UserCreate>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<UserCreate>()),
    ));
  }

  update(id: number, product: UserCreate): Observable<any> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put(url, product).pipe(
      tap(),
      catchError(this.handleError<UserCreate>('update')),
    );
  }

  delete(id: any): Observable<User> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<User>(url).pipe(
      tap(),
      catchError(this.handleError<User>('delete')),
    );
  }
}
