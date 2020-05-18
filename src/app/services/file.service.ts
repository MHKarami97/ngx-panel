import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Banner } from '../models/more/banner.module';

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

  create(): Observable<Api<Banner>> {
    return this.http.post<Api<Banner>>(this.apiUrl + 'create', '').pipe(
      tap(),
      catchError(this.handleError('get', new Api<Banner>()),
      ));
  }
}
