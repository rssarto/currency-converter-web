import * as fromLogin from '@app/store/login.reducer';

export interface State{
    login: fromLogin.State
}

export const reducers = {
    login: fromLogin.reducer
}