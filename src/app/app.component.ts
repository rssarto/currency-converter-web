import { Component, OnInit } from '@angular/core';
import * as fromLoginState from '@app/store/login.reducer';
import * as fromLogin from '@app/store/reducers';
import { Observable } from 'rxjs';
import { StoreService } from '@app/store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginState$: Observable<fromLoginState.State>;
  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.loginState$ = this.storeService.getLoginState();
  }

}
