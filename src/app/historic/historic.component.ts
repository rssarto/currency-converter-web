import { Subscription } from 'rxjs/Subscription';
import { Quotation } from './../model/quotation';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '@app/store/store.service';
import { Observable } from 'rxjs';
import * as fromQuotationState from '@app/store/quotation.reducer';
import * as QuotationActions from '@app/store/quotation.actions';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {
  quotationState$: Observable<fromQuotationState.State>;

  subscription: Subscription;

  newQuotation = new Quotation();
  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.quotationState$ = this.storeService.getQuotationState();
  }

  announceHistoricQuotation(quotation: Quotation) {
    this.storeService.dispatchAction(new QuotationActions.SetHistoricSelectedQuotation(quotation));
  }
}
