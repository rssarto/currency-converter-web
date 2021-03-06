import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromLogin from '@app/store/reducers';
import { take, map } from '../../../node_modules/rxjs/operators';
import { pipe } from '../../../node_modules/rxjs';
import { StoreService } from '@app/store/store.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private store: Store<fromLogin.State>,
              private storeService: StoreService) { }

  canActivate() {
    return this.store.select(state => state.login).pipe(
      take(1),
      map( (value) => {
          if ( !(value === undefined) ) {
            if ( !value.isAuthenticated ) {
              this.router.navigate(['login']);
            }
            return value.isAuthenticated;
          }
          return false;
        }
      )
    );
  }

}
