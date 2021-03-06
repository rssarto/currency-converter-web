import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LogoutComponent } from './logout/logout.component';
import { PanelComponent } from './panel/panel.component';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'panel', component: PanelComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
