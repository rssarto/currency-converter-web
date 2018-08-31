import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromLogin from '@app/store/reducers';
import * as fromLoginState from '@app/store/login.reducer';
import { Observable } from 'rxjs';
import { StorageService } from '@app/service/storage.service';

const loginState = (state: fromLogin.State) => state.login;

@Injectable()
export class StoreService {

  constructor(private store: Store<fromLogin.State>,
              private storageService: StorageService) {
    this.store.subscribe((loginStateValue) => {
      this.storageService.saveState(JSON.stringify(loginStateValue));
    });
  }

  getLoginState(): Observable<fromLoginState.State> {
    return this.store.select(loginState);
  }
}
