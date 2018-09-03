import { Currency } from './currency';
export class Quotation {
  id: number;
  source: string;
  destination: string;
  time: Date;
  amount: number;
  result: number;

  isValid() {
    return this.source !== '' && this.destination !== '' && this.amount > 0;
  }
}
