import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url: string;
  constructor(public http: HttpClient) {
    this.url = environment.API_BASE_URL;
  }

  post<T>(apiRoute: string, body: T) {
    return this.http
      .post(`${this.url + apiRoute}`, body, {
        headers: this.getHttpHeaders(),
      })
      .pipe(
        catchError((err: HttpErrorResponse) => throwError(() => err.error))
      );
  }

  get(apiRoute: string) {
    return this.http.get(`${this.url + apiRoute}`, {
      headers: this.getHttpHeaders(),
    });
  }

  put(apiRoute: string, body: any) {
    return this.http.put(`${this.url + apiRoute}`, body, {
      headers: this.getHttpHeaders(),
    });
  }

  delete(apiRoute: string) {
    return this.http.delete(`${this.url + apiRoute}`, {
      headers: this.getHttpHeaders(),
    });
  }

  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }
}
