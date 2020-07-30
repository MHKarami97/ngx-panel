import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Piece, PieceCreate, ClientPiece, ClientPieceCreate } from '../models/piece/piece.module';

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

  getById(id: number): Observable<Api<Piece>> {
    const url = `${this.apiUrl}get/${id}`;
    return this.http.get<Api<Piece>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Piece>>(`getById id=${id}`)),
    );
  }

  create(product: PieceCreate): Observable<Api<Piece>> {
    return this.http.post<Api<Piece>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<Piece>()),
    ));
  }

  update(id: number, product: PieceCreate): Observable<Api<Piece>> {
    const url = `${this.apiUrl}update/${id}`;
    return this.http.put<Api<Piece>>(url, product).pipe(
      tap(),
      catchError(this.handleError<Api<Piece>>('update')),
    );
  }

  delete(id: any): Observable<Api<Piece>> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Api<Piece>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Piece>>('delete')),
    );
  }

  getClientPiece(): Observable<Api<ClientPiece[]>> {
    return this.http.get<Api<ClientPiece[]>>(this.apiUrl + 'getClientPiece')
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<ClientPiece[]>()),
      ));
  }

  addPieceToClient(product: ClientPieceCreate): Observable<Api<ClientPiece>> {
    return this.http.post<Api<ClientPiece>>(this.apiUrl + 'addPieceToClient', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<ClientPiece>()),
    ));
  }
}
