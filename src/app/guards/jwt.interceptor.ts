import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (currentUser !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.jeton}`
                }
            });
        }

        return next.handle(request);
    }
}