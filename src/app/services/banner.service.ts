import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Banner, BannerCreate } from '../models/more/banner.module';

@Injectable({
  providedIn: 'root',
})
export class BannerService {

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

  get(): Observable<Api<Banner[]>> {
    return this.http.get<Api<Banner[]>>(this.apiUrl + 'get')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<Banner[]>()),
      ));
  }

  getById(id: number): Observable<Banner> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Banner>(url).pipe(
      tap(),
      catchError(this.handleError<Banner>(`getById id=${id}`)),
    );
  }

  create(product: BannerCreate): Observable<Api<BannerCreate>> {
    return this.http.post<Api<BannerCreate>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<BannerCreate>()),
    ));
  }

  update(id: number, product: BannerCreate): Observable<any> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put(url, product).pipe(
      tap(),
      catchError(this.handleError<BannerCreate>('update')),
    );
  }

  delete(id: any): Observable<Banner> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Banner>(url).pipe(
      tap(),
      catchError(this.handleError<Banner>('delete')),
    );
  }
}
