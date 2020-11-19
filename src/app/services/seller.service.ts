import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import {Seller, SellerCreate, SellerSingle} from '../models/client/Seller.module';

@Injectable({
  providedIn: 'root',
})
export class SellerService {

  apiUrl = 'seller/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  get(): Observable<Api<Seller[]>> {
    return this.http.get<Api<Seller[]>>(this.apiUrl + 'getall')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<Seller[]>()),
      ));
  }

  getById(id: number): Observable<Api<SellerSingle>> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Api<SellerSingle>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<SellerSingle>>(`getById id=${id}`)),
    );
  }

  create(product: SellerCreate): Observable<Api<Seller>> {
    return this.http.post<Api<Seller>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<Seller>()),
    ));
  }

  update(id: number, product: SellerCreate): Observable<Api<Seller>> {
    const url = `${this.apiUrl}update`;
    return this.http.post<Api<Seller>>(url, product).pipe(
      tap(),
      catchError(this.handleError<Api<Seller>>('update')),
    );
  }

  delete(id: any): Observable<Api<Seller>> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Api<Seller>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Seller>>('delete')),
    );
  }
}
