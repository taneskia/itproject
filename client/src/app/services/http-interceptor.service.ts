import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HttpInterceptorService {
  constructor(private authService: AuthenticationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
      headers: req.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.authService.getToken()}`),
    });

    return next.handle(req);
  }
}
