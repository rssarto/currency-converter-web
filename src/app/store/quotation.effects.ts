import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as QuotationActions from '@app/store/quotation.actions';
import { CurrencyService } from '@app/service/currency.service';
import { Quotation } from '@app/model/quotation';

@Injectable()
export class QuotationEffects {

  @Effect()
  tryUpdateQuotation$: Observable<Action> = this.actions$
    .pipe(
      ofType(QuotationActions.TRY_UPDATE_QUOTATION_HISTORY),
      mergeMap(action => this.currencyService.historic().
        pipe(
          map((quotations: Quotation[]) => (new QuotationActions.UpdateQuotationHistorySuccess(quotations))),
          catchError(() => of(new QuotationActions.UpdateQuotationHistoryFail()))
        ))
    );
  constructor(private currencyService: CurrencyService,
              private actions$: Actions) {}
}
