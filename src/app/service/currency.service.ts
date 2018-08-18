import { Quotation } from './../model/quotation';
import { Observable } from 'rxjs';
import { Currency } from './../model/currency';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@env/environment"

@Injectable()
export class CurrencyService {

  constructor(private http: HttpClient) {
   }

  list(): Observable<Currency[]> {
    return this.http.get<Currency[]>(environment.currencyListUrl);
  }

  quote(quotation: Quotation) {
    return this.http.post<Quotation>(environment.quotationUrl, 
                                     quotation);
  }

  historic() {
    return this.http.get<Quotation[]>(environment.historicUrl);
  }
}
