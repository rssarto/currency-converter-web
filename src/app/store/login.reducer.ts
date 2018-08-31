import { Token } from '@app/model/token';
import * as LoginActions from '@app/store/login.actions';
import * as StorageConstants from '@app/service/storage.service';


export interface State {
    isAuthenticated: boolean;
    result: Token;
}

const initialState = {
    isAuthenticated: false,
    result: null
};

export function reducer(state = initialState, action: LoginActions.All): State {
    switch (action.type) {
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
        case(LoginActions.LOGOUT_SUCCESS): {
          return {
            isAuthenticated: false,
            result: null
          };
        }

        default: {
          const loginState = retrieveState();
          if ( loginState ) {
            return JSON.parse(loginState).login;
          } else {
            return state;
          }
        }
    }
}

function retrieveState() {
  return window.sessionStorage.getItem(StorageConstants.STATE_KEY);
}
