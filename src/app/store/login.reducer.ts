import { Token } from '@app/model/token';
import * as LoginActions from '@app/store/login.actions';


export interface State{
    isAuthenticated: boolean;
    result: Token;
}

const initialState = {
    isAuthenticated: false,
    result: null
};

export function reducer(state = initialState, action: LoginActions.All): State{
    switch(action.type) {
        case(LoginActions.TRY_LOGIN): {
            return{
                ...state
            };
        }
        case(LoginActions.LOGIN_SUCCESS): {
            return{
                ...state,
                result: (<LoginActions.LoginSuccess>action).payload,
                isAuthenticated: true
            };
        }
        case(LoginActions.LOGIN_FAILED): {
            return{
                ...state,
                isAuthenticated: false
            };
        }
    }
}
