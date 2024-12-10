import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from '../Components/register/register.component';
import { LoginComponent } from '../Components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from '../Components/admin/admin.component';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { UserManagementComponent } from '../Components/user-management/user-management.component';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../Components/profile/profile.component';
import { StatisticsComponent } from '../Components/statistics/statistics.component';
import { Chart, registerables } from 'chart.js';
import { GroupComponent } from '../Components/group/group.component';
import { TeamComponent } from '../Components/team/team.component';
import { PaymentDetailsComponent } from '../Components/payment-details/payment-details.component';
import { SuccessComponent } from '../Components/success/success.component'; 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    DashboardComponent,
    UserManagementComponent,
    ProfileComponent,
    StatisticsComponent,
    GroupComponent,
    TeamComponent,
    PaymentDetailsComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {  
    Chart.register(...registerables);  
   }  
}
