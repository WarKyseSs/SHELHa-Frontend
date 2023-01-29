import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) =>
      {
        if (err.status === 401 && this.router.url !== '/connection')
        {
          // if user are  not connected or the JWT token has expired, redirect the user to the login page
          this.router.navigate(['/connection']);
        }
        throw err;
      })
    );
  }
}

