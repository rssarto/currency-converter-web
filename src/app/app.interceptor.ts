import { StorageService } from '@app/service/storage.service';
import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { Store } from '@ngrx/store';
import * as fromLogin from '@app/store/reducers';
import { Token } from '@app/model/token';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: StorageService, private router: Router, private store: Store<fromLogin.State>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(state => state.login).pipe(
      take(1),
      switchMap((value) => {
        let httpHeaders = new HttpHeaders;
        if (value.result != null) {
          httpHeaders = httpHeaders.set(TOKEN_HEADER_KEY, 'Bearer ' + value.result.token);
        }

        const authReq = req.clone({ headers: httpHeaders });

        return next.handle(authReq).do(
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['user']);
              }
            }
          }
        );
      })
    );
 }
}
