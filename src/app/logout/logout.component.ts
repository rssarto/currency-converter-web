import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '@app/service/storage.service';
import { AuthService } from '../service/auth.service';
import * as fromLogin from '@app/store/reducers';
import * as LoginActions from '@app/store/login.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  ngOnInit() {
  }

  constructor(private store: Store<fromLogin.State>) {
    setTimeout(() => {
      this.logout();
    }, 3000);
  }

  logout() {
    this.store.dispatch(new LoginActions.TryLogout);
  }
}
