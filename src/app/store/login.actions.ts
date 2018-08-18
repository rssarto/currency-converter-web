import { Action } from '@ngrx/store';
import { Credentials } from '@app/model/credentials';
import { Token } from '../../../node_modules/@angular/compiler';

export const TRY_LOGIN = '[Login] TRY_LOGIN';
export const LOGIN_SUCCESS = '[Login] Success';
export const LOGIN_FAILED = '[Login] Failed';

export class TryLogin implements Action{
    readonly type = TRY_LOGIN;
    constructor(public payload: Credentials){}
}

export class LoginSuccess implements Action{
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: Token){}
}

export class LoginFailed implements Action{
    readonly type = LOGIN_FAILED;
}

export type All = TryLogin | LoginSuccess | LoginFailed;