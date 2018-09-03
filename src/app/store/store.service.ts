import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';

import * as fromApp from '@app/store/reducers';
import * as fromLoginState from '@app/store/login.reducer';
import * as fromQuotationState from '@app/store/quotation.reducer';
import { Observable } from 'rxjs';
import { StorageService } from '@app/service/storage.service';
import * as StorageConstants from '@app/service/storage.service';

const loginState = (state: fromApp.State) => state.login;
const quotationState = (state: fromApp.State) => state.quotation;

@Injectable()
export class StoreService {

  constructor(private store: Store<fromApp.State>,
              private storageService: StorageService) {
    this.store.subscribe((loginStateValue) => {
      this.storageService.saveState(JSON.stringify(loginStateValue));
    });
  }

  dispatchActions(actions: Action[]): void {
    actions.forEach(action => this.dispatchAction(action));
  }

  dispatchAction(action: Action): void {
    this.store.dispatch(action);
  }

  getLoginState(): Observable<fromLoginState.State> {
    return this.store.select(loginState);
  }

  getQuotationState(): Observable<fromQuotationState.State> {
    return this.store.select(quotationState);
  }
}

export function retrieveState() {
  return window.sessionStorage.getItem(StorageConstants.STATE_KEY);
}

