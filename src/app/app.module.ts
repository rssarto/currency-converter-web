import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { DataService } from './service/data.service';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { CountryModule } from 'ngx-country-list';
import { IqDatepickerModule } from 'ngx-iq-datepicker';

import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './service/auth.service';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { StorageService } from '@app/service/storage.service';
import { LogoutComponent } from './logout/logout.component';
import { UserService } from './service/user.service';
import { ModalService } from './service/modal.service';
import { UIErrorHandler } from './app.uierrorhandler';
import { PanelComponent } from './panel/panel.component';
import { ConversionComponent } from './conversion/conversion.component';
import { HistoricComponent } from './historic/historic.component';
import { CurrencyService } from './service/currency.service';
import { Interceptor } from './app.interceptor';
import { DatePipe } from '@angular/common';
import { AuthGuardService } from './service/auth-guard.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from '@app/store/login.effects';
import { StoreService } from '@app/store/store.service';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    NotfoundComponent,
    ModalContentComponent,
    LoginComponent,
    LogoutComponent,
    PanelComponent,
    ConversionComponent,
    HistoricComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    CountryModule,
    IqDatepickerModule,
    JwtModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      fullScreenBackdrop : true
    }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LoginEffects])
  ],
  entryComponents: [
    // Add here components that are created dynamically.
    ModalContentComponent
  ],
  providers: [StoreService, AuthService, StorageService, BsModalService, BsModalRef, UserService, ModalService, CurrencyService,
              DataService, DatePipe, JwtHelperService, AuthGuardService,
             { provide: ErrorHandler, useClass: UIErrorHandler },
             { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
