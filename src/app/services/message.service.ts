import { Observable, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Api } from '../models/base/api.model';
import { MessageCreate, Message } from '../models/more/message.module';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  apiUrl = 'message/';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.error.next(error.message);
      return throwError(error);
    };
  }

  create(product: MessageCreate): Observable<Api<Message>> {
    return this.http.post<Api<Message>>(this.apiUrl + 'create', product).pipe(
      tap(),
      catchError(this.handleError('get', new Api<Message>()),
      ));
  }

  delete(id: any): Observable<Api<Message>> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.delete<Api<Message>>(url).pipe(
      tap(),
      catchError(this.handleError<Api<Message>>('delete')),
    );
  }
}
