import { Currency } from './../model/currency';
import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../service/currency.service';
import { Quotation } from '../model/quotation';
import { HistoricComponent } from '../historic/historic.component';
import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalService } from '../service/modal.service';
import { LoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {

  public loading = false;

  subscription: Subscription;
  currencyList: Currency[];
  currency: Currency;
  quotation = new Quotation;
  result: number;

  constructor(private currencyService: CurrencyService,
              private dataService: DataService,
              private appModalService: ModalService) {
    this.subscription = this.dataService.getHistoricQuotation().subscribe(
      data => {
        console.log('received historic quotation');
        const historicQuotation = data;
        this.quotation = new Quotation();
        this.quotation.source = historicQuotation.source;
        this.quotation.amount = historicQuotation.amount;
        this.quotation.destination = historicQuotation.destination;
      }
    );
   }

  ngOnInit() {
    this.currencyService.list().subscribe(
      data => {
        this.currencyList = <Currency[]> data;
      }
    );
  }

  onConversion() {
    if ( this.quotation.isValid() ) {
      this.loading = true;
      this.currencyService.quote(this.quotation).subscribe(
        data => {
          const newQuotation = <Quotation>data;
          this.quotation.result = newQuotation.result;
          this.announceNewQuotation(newQuotation);
          this.loading = false;
        }
      );
    } else {
      this.appModalService.openModal('Invalid quotation.');
    }
  }

  announceNewQuotation(quotation: Quotation) {
    this.dataService.sendNewQuotation(quotation);
    console.log('announced new quotation: ' + quotation);
  }

}
