import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { Statistic } from '../models/more/Statistic.module';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {

  apiUrl = 'statistic';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      this.error.next(error.message);
      return throwError(error);
    };
  }

  get(): Observable<Api<Statistic>> {
    return this.http.get<Api<Statistic>>(this.apiUrl)
      .pipe(
        tap(),
        catchError(this.handleError('get', new Api<Statistic>()),
      ));
  }
}
