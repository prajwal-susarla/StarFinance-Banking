import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor, authInterceptorProviders } from './_helpers/auth.interceptor';
import { KycComponent } from './kyc/kyc.component';
import { LoanComponent } from './loan/loan.component';
import { EmployeeVerificationComponent } from './employee-verification/employee-verification.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { GoldVerificationComponent } from './gold-verification/gold-verification.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    KycComponent,
    LoanComponent,
    EmployeeVerificationComponent,
    UserVerificationComponent,
    GoldVerificationComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

