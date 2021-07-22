import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        event => {},
        error => {
          if (error instanceof HttpErrorResponse) {
            console.log(error);
            if (error.status === 401) {
              this.authService.logout();
            }
          }
        }
      ));
  }
}
