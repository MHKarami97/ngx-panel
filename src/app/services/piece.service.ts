import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Piece, PieceCreate } from '../models/piece/piece.module';

@Injectable({
  providedIn: 'root',
})
export class PieceService {

  apiUrl = 'piece/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  get(): Observable<Api<Piece[]>> {
    return this.http.get<Api<Piece[]>>(this.apiUrl + 'get')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<Piece[]>()),
      ));
  }

  getById(id: number): Observable<Piece> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Piece>(url).pipe(
      tap(),
      catchError(this.handleError<Piece>(`getById id=${id}`)),
    );
  }

  create(product: PieceCreate): Observable<Api<PieceCreate>> {
    return this.http.post<Api<PieceCreate>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<PieceCreate>()),
    ));
  }

  update(id: number, product: PieceCreate): Observable<any> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put(url, product).pipe(
      tap(),
      catchError(this.handleError<PieceCreate>('update')),
    );
  }

  delete(id: any): Observable<Piece> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Piece>(url).pipe(
      tap(),
      catchError(this.handleError<Piece>('delete')),
    );
  }
}
