import { Quotation } from '../model/quotation';
import { Action } from '@ngrx/store';

export const TRY_UPDATE_QUOTATION_HISTORY = 'TRY_UPDATE_QUOTATION_HISTORY';
export const UPDATE_QUOTATION_HISTORY_SUCCESS = 'UPDATE_QUOTATION_HISTORY_SUCCESS';
export const UPDATE_QUOTATION_HISTORY_ERROR = 'UPDATE_QUOTATION_HISTORY_ERROR';
export const SET_HISTORIC_SELECTED_QUOTATION = 'SET_HISTORIC_SELECTED_QUOTATION';
export const CLEAR_HISTORIC_SELECTED_QUOTATION = 'CLEAR_HISTORIC_SELECTED_QUOTATION';

export class TryUpdateQuotationHistory implements Action {
    readonly type = TRY_UPDATE_QUOTATION_HISTORY;
}

export class UpdateQuotationHistorySuccess implements Action {
    readonly type = UPDATE_QUOTATION_HISTORY_SUCCESS;
    constructor(public payload: Quotation[]) {}
}

export class UpdateQuotationHistoryFail implements Action {
  readonly type = UPDATE_QUOTATION_HISTORY_ERROR;
}

export class SetHistoricSelectedQuotation implements Action {
  readonly type = SET_HISTORIC_SELECTED_QUOTATION;
  constructor(public payload: Quotation) {}
}

export class ClearHistoricSelectedQuotation implements Action {
  readonly type = CLEAR_HISTORIC_SELECTED_QUOTATION;
}

export type All = TryUpdateQuotationHistory |
                  UpdateQuotationHistorySuccess |
                  UpdateQuotationHistoryFail |
                  SetHistoricSelectedQuotation |
                  ClearHistoricSelectedQuotation;
