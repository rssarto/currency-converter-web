import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { StoreService } from '@app/store/store.service';
import { Currency } from './../model/currency';
import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../service/currency.service';
import { Quotation } from '../model/quotation';
import { ModalService } from '../service/modal.service';
import * as QuotationActions from '@app/store/quotation.actions';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {

  public loading = false;
  currencyList$: Observable<Currency[]>;
  quotation = new Quotation;

  constructor(private currencyService: CurrencyService,
              private appModalService: ModalService,
              private storeService: StoreService) {}

  ngOnInit() {
    this.currencyList$ = this.currencyService.list();
    this.quotation.source = '';
    this.quotation.destination = '';

    this.storeService.getQuotationState().
      pipe(
        map((state) => state.historicQuotationSelected)
      ).subscribe((quotationState: Quotation) => {
        if ( quotationState ) {
          this.quotation.source = quotationState.source;
          this.quotation.destination = quotationState.destination;
          this.quotation.amount = quotationState.amount;
        }
      });
  }

  onConversion() {
    if ( this.quotation.isValid() ) {
      this.loading = true;
      this.currencyService.quote(this.quotation).subscribe(
        data => {
          const newQuotation = <Quotation>data;
          this.quotation.result = newQuotation.result;
          this.storeService.dispatchAction(new QuotationActions.TryUpdateQuotationHistory);
          this.loading = false;
        }
      );
    } else {
      this.appModalService.openModal('Invalid quotation.');
    }
  }
}
