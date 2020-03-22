import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Category } from '../models/category/category.module';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  apiUrl: 'category/';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      return throwError(error);
    };
  }

  get(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + 'get')
      .pipe(
        tap(),
        catchError(this.handleError('get', [])),
      );
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(),
      catchError(this.handleError<Category>(`getById id=${id}`)),
    );
  }

  create(product: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError<Category>('create')),
    );
  }

  update(id: number, product: Category): Observable<any> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put(url, product).pipe(
      tap(),
      catchError(this.handleError<any>('update')),
    );
  }

  delete(id: any): Observable<Category> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Category>(url).pipe(
      tap(),
      catchError(this.handleError<Category>('delete')),
    );
  }
}
