import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeVerificationComponent } from './employee-verification/employee-verification.component';
import { GoldVerificationComponent } from './gold-verification/gold-verification.component';
import { HomeComponent } from './home/home.component'
import { KycComponent } from './kyc/kyc.component';
import { LoanComponent } from './loan/loan.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { RoleGuardService } from './_services/role-guard.service';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login',component: LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'kyc',component:KycComponent,canActivate:[RoleGuardService,AuthGuardService],data:{expectedRole:['ROLE_USER']}},
  {path:'loan',component:LoanComponent,canActivate:[AuthGuardService,RoleGuardService],data:{expectedRole:['ROLE_USER']}},
  {path:'empverification',component:EmployeeVerificationComponent,canActivate:[AuthGuardService,RoleGuardService],data:{expectedRole:['ROLE_EMPLOYEE']}},
  {path:'empverification/:id',component:EmployeeVerificationComponent,canActivate:[AuthGuardService,RoleGuardService],data:{expectedRole:['ROLE_EMPLOYEE']}},
  {path:'userverification',component:UserVerificationComponent,canActivate:[AuthGuardService,RoleGuardService],data:{expectedRole:['ROLE_USER']}},
  {path:'goldverification',component:GoldVerificationComponent,canActivate:[AuthGuardService,RoleGuardService],data:{expectedRole:['ROLE_EMPLOYEE_8','ROLE_EMPLOYEE_16','ROLE_EMPLOYEE_24']}},
  {path:'goldverification/:id',component:GoldVerificationComponent,canActivate:[AuthGuardService,RoleGuardService],data:{expectedRole:['ROLE_EMPLOYEE_8','ROLE_EMPLOYEE_16','ROLE_EMPLOYEE_24']}},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
