import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorage } from './token.storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../model/credentials';
import { Token } from '../model/token';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelperService;

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorage) {
    this.jwtHelper = new JwtHelperService();
  }

  attemptAuth(credentials: Credentials) {
    return this.http.post<Token>(environment.authenticationUrl, credentials);
  }

  isAuthenticated(): boolean {
    if ( this.tokenStorage.getToken() !== null ) {
      const token = this.tokenStorage.getToken();
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
}
