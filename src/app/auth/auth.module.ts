import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbIconModule } from '@nebular/theme';

import { NgxLoginComponent } from './login/login.component';
import { NgxLogoutComponent } from './logout/logout.component';
import { NgxRegisterComponent } from './register/register.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxRequestPasswordComponent } from './request-password/request-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbIconModule,
    NbAuthModule,
  ],
  declarations: [
    NgxLoginComponent,
    NgxLogoutComponent,
    NgxRegisterComponent,
    NgxResetPasswordComponent,
    NgxRequestPasswordComponent,
  ],
})
export class NgxAuthModule {
}
