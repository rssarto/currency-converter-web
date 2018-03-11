import { Fault } from './../model/fault';
import { TokenStorage } from './../service/token.storage';
import { AuthService } from './../service/auth.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Credentials } from '../model/credentials';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from '../service/modal.service';
import { LoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;

  userName: string;
  password: string;

  constructor(private authService: AuthService,
    private token: TokenStorage,
    private router: Router,
    private appModalService: ModalService) { }

  ngOnInit() {
  }

  login(): void {
    this.loading = true;
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
