import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private authProvider: AuthProvider) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.authProvider.token}`
      }
    });

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).do((event: any) => {
      if (event instanceof HttpResponse) {
        console.log({'event' : event})
        return event;
      }
    }).catch(error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.authProvider.logout();
        }
        return _throw(error);
      }
    });
  }
}
