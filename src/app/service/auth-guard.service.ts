import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    console.log('AuthGuard Service');
    if ( !this.authService.isAuthenticated() ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
