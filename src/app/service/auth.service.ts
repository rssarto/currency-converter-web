import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorage } from './token.storage';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../model/credentials';
import { Token } from '../model/token';
import { AppsettingsService } from './appsettings.service';
import { AppSettings } from '../appsettings/appSettings';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelperService;

  constructor(private http: HttpClient,
              private appSettingsService: AppsettingsService,
              private tokenStorage: TokenStorage) {
    this.jwtHelper = new JwtHelperService();
    appSettingsService.getSettings().subscribe(
      settings => {
        this.appSettings = settings;
      }
    );
  }

  appSettings: AppSettings;

  attemptAuth(credentials: Credentials) {
    return this.http.post<Token>(this.appSettings.authenticationUrl, credentials);
  }

  isAuthenticated(): boolean {
    if ( this.tokenStorage.getToken() !== null ) {
      const token = this.tokenStorage.getToken();
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

}
