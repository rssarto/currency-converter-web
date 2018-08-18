import { TokenStorage } from './service/token.storage';
import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { Store } from '@ngrx/store';
import * as fromLogin from '@app/store/reducers';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router, private store: Store<fromLogin.State>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(state => state.login).pipe(
      take(1),
      switchMap((value) => {
        const authReq = req.clone({ headers: req.headers
          .set(TOKEN_HEADER_KEY, 'Bearer ' + value.result)
        });
        
        return next.handle(authReq).do(
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              console.log('retorno');
              console.log(err);
              if (err.status === 401) {
                this.router.navigate(['user']);
              }
            }
          }
        );        
      })
    );

    /*
    console.log('intercepting request');
    let authReq = req;
    if (this.token.getToken() != null) {
      console.log('inserting token');
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this .token.getToken())});
      // authorization header bearer token not found springboot
      console.log(authReq);
    }
    console.log('calling');
    return next.handle(authReq).do(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log('retorno');
          console.log(err);
          if (err.status === 401) {
            this.router.navigate(['user']);
          }
        }
      }
    );
    */
  }
}
