import { TokenStorage } from './../service/token.storage';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Credentials } from '../model/credentials';
import { Router } from '@angular/router';
import { ModalService } from '../service/modal.service';
import { Store } from '@ngrx/store';
import * as fromLogin from '@app/store/reducers';
import { Observable } from '../../../node_modules/rxjs';
import { Token } from '../../../node_modules/@angular/compiler';
import * as LoginActions from '@app/store/login.actions';
import { LoginEffects } from '@app/store/login.effects';

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

  constructor(private authService: AuthService,
    private token: TokenStorage,
    private router: Router,
    private appModalService: ModalService,
    private store: Store<fromLogin.State>,
    private loginEffects: LoginEffects) { }

  ngOnInit() {
  }

  login(): void {
    this.loading = true;
    /*
    this.authService.attemptAuth(new Credentials(this.userName, this.password)).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.router.navigate(['panel']);
        this.loading = false;
      },
      errorData => {
        this.appModalService.openModal('Invalid credentials.');
        this.loading = false;
      }
    );
    */
    this.store.dispatch(new LoginActions.TryLogin(new Credentials(this.userName, this.password)));
    this.loginEffects.authLogin$
      .filter(action => action.type === LoginActions.LOGIN_SUCCESS)
      .subscribe((action) => {
        this.router.navigate(['panel']);
        this.loading = false;
        console.log('login success');
    });

    this.loginEffects.authLogin$
      .filter(action => action.type === LoginActions.LOGIN_FAILED)
      .subscribe((action) => {
        this.appModalService.openModal('Invalid credentials.');
        this.loading = false;
      });
  }

  /*
  openModal(message: string) {
    const initialState = {
      list: [
        message
      ],
      title: 'Message'
    };
    this.modalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.modalRef.content.closeBtnName = 'Close';
  }
  */
}
