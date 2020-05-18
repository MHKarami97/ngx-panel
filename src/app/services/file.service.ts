import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  apiUrl = 'file/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  create(data: FormData): Observable<Api<string>> {
    return this.http.post<Api<string>>(this.apiUrl + 'create', data).pipe(
      tap(),
      catchError(this.handleError('get', new Api<string>()),
      ));
  }
}
