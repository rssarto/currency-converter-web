import { Effect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import * as LoginActions from '@app/store/login.actions';
import { AuthService } from '@app/service/auth.service';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class LoginEffects {
    @Effect()
    authToken$: Observable<Action> = this.actions$.pipe(
        ofType(LoginActions.TRY_LOGIN),
        mergeMap(action => 
            this.authService.attemptAuth( (<LoginActions.TryLogin>action).payload ).pipe(
                map(token => ({type: LoginActions.LOGIN_SUCCESS, payload: token}) ),
                catchError( () => of({type: LoginActions.LOGIN_FAILED}) ) 
            )
        )
    );

    @Effect()
    authLogin$: Observable<Action> = this.actions$.pipe(
        ofType(LoginActions.LOGIN_SUCCESS, LoginActions.LOGIN_FAILED),
        take(1)
    );

    constructor(private authService: AuthService, private actions$: Actions){}
}