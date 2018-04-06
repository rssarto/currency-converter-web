import { Country } from './../model/country';
import { Fault } from './../model/fault';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { ContryService } from 'ngx-country-list';
import { DatePipe } from '@angular/common';
import { LoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public loading = false;

  isBirthDateManipulated  = false;
  user = new User();
  countries: Country[];

  constructor(private router: Router, private userService: UserService, private countryService: ContryService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.countries = this.countryService.getAllCountryDetails();
    this.user.country = '';
  }

  onSignUp() {
    this.loading = true;
    const birthDate = new Date(this.user.birthDate);
    this.user.birthDate = this.datePipe.transform(birthDate, 'dd/MM/yyyy');
    console.log('user date birth: ' + this.user.birthDate);
    this.userService.signUp(this.user).subscribe(
      data => {
        const returnedUser = <User>data;
        this.user = new User();
        this.loading = false;
        this.router.navigate(['login']);
      }
    );
  }

  onBirthDateManipulation() {
    this.isBirthDateManipulated = true;
    console.log('isBirthDateManipulated: ' + this.isBirthDateManipulated);
  }
}
