import { Action } from '@ngrx/store';
import { Credentials } from '@app/model/credentials';
import { Token } from '@app/model/token';

export const TRY_LOGIN = '[Login] TRY_LOGIN';
export const LOGIN_SUCCESS = '[Login] Success';
export const LOGIN_FAILED = '[Login] Failed';
export const TRY_LOGOUT = '[Login] TRY_LOGOUT';
export const LOGOUT_SUCCESS = '[Login] LOGOUT_SUCCESS';

export class TryLogin implements Action {
  readonly type = TRY_LOGIN;
  constructor(public payload: Credentials) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: Token) {}
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
}

export class TryLogout implements Action {
  readonly type = TRY_LOGOUT;
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
}

export type All = TryLogin | LoginSuccess | LoginFailed | TryLogout | LogoutSuccess;
