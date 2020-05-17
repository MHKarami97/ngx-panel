import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Company, CompanyCreate } from '../models/client/company.module';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {

  apiUrl= 'company/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  get(): Observable<Api<Company[]>> {
    return this.http.get<Api<Company[]>>(this.apiUrl + 'getall')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<Company[]>()),
      ));
  }

  getById(id: number): Observable<Api<Company>> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Api<Company>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Company>>(`getById id=${id}`)),
    );
  }

  create(product: CompanyCreate): Observable<Api<Company>> {
    return this.http.post<Api<Company>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<Company>()),
    ));
  }

  update(id: number, product: CompanyCreate): Observable<Api<Company>> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put<Api<Company>>(url, product).pipe(
      tap(),
      catchError(this.handleError<Api<Company>>('update')),
    );
  }

  delete(id: any): Observable<Api<Company>> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Api<Company>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Company>>('delete')),
    );
  }
}
