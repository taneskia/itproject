import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";

@Injectable()
export class HttpInterceptorService {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true
        });

        return next.handle(req);
    }
}
