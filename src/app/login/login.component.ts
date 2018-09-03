import { Component, OnInit } from '@angular/core';
import { Credentials } from '../model/credentials';
import { Router } from '@angular/router';
import { ModalService } from '../service/modal.service';
import { Observable } from '../../../node_modules/rxjs';
import { Token } from '../../../node_modules/@angular/compiler';
import * as LoginActions from '@app/store/login.actions';
import * as QuotationActions from '@app/store/quotation.actions';
import { LoginEffects } from '@app/store/login.effects';
import { StoreService } from '@app/store/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;

  userName: string;
  password: string;

  loginState: Observable<{result: Token}>;

  constructor(private router: Router,
              private appModalService: ModalService,
              private loginEffects: LoginEffects,
              private storeService: StoreService) { }

  ngOnInit() {
  }

  login(): void {
    this.loading = true;

    this.storeService.dispatchAction(new LoginActions.TryLogin(new Credentials(this.userName, this.password)));
    this.loginEffects.authLogin$
      .filter(action => action.type === LoginActions.LOGIN_SUCCESS)
      .subscribe((action) => {
        this.router.navigate(['panel']);
        this.loading = false;
        this.storeService.dispatchAction(new QuotationActions.TryUpdateQuotationHistory);
      });

    this.loginEffects.authLogin$
      .filter(action => action.type === LoginActions.LOGIN_FAILED)
      .subscribe((action) => {
        this.appModalService.openModal('Invalid credentials.');
        this.loading = false;
      });
  }
}
