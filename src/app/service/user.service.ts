import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { environment } from '@env/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(environment.signUpUrl, user);
  }

}
