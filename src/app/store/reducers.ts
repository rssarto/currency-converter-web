import * as fromLogin from '@app/store/login.reducer';
import * as fromQuotation from '@app/store/quotation.reducer';

export interface State {
    login: fromLogin.State;
    quotation: fromQuotation.State;
}

export const reducers = {
    login: fromLogin.reducer,
    quotation: fromQuotation.reducer
};
