import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Category, CategoryCreate } from '../models/category/category.module';
import { Api } from '../models/base/api.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  apiUrl= 'pieceCategory/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  get(): Observable<Api<Category[]>> {
    return this.http.get<Api<Category[]>>(this.apiUrl + 'get')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<Category[]>()),
      ));
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(),
      catchError(this.handleError<Category>(`getById id=${id}`)),
    );
  }

  create(product: CategoryCreate): Observable<Api<CategoryCreate>> {
    return this.http.post<Api<CategoryCreate>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<Category>()),
    ));
  }

  update(id: number, product: CategoryCreate): Observable<any> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put(url, product).pipe(
      tap(),
      catchError(this.handleError<CategoryCreate>('update')),
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
