import * as QuotationActions from './quotation.actions';
import { Quotation } from '@app/model/quotation';
import * as fromStoreService from '@app/store/store.service';

export interface State {
    quotationHistory: Quotation[];
    historicQuotationSelected: Quotation;
}

const initialState: State = {
    quotationHistory: [],
    historicQuotationSelected: null
};

export function reducer(state = initialState, action: QuotationActions.All) {
  switch (action.type) {
    case(QuotationActions.UPDATE_QUOTATION_HISTORY_SUCCESS): {
      return {
        ...state,
        quotationHistory: (<QuotationActions.UpdateQuotationHistorySuccess>action).payload
      };
    }
    case(QuotationActions.TRY_UPDATE_QUOTATION_HISTORY): {
      return {
        ...state
      };
    }
    case(QuotationActions.SET_HISTORIC_SELECTED_QUOTATION): {
      return {
        ...state,
        historicQuotationSelected: (<QuotationActions.SetHistoricSelectedQuotation>action).payload
      };
    }
    case(QuotationActions.CLEAR_HISTORIC_SELECTED_QUOTATION): {
      return {
        ...state,
        historicQuotationSelected: null
      };
    }
    default: {
      const appState = fromStoreService.retrieveState();
      if ( appState ) {
        try {
          return JSON.parse(appState).quotation;
        } catch {
          return state;
        }
      } else {
        return state;
      }
    }
  }
}
