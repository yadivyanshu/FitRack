import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../Components/register/register.component';
import { LoginComponent } from '../Components/login/login.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from '../Components/admin/admin.component';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { UserManagementComponent } from '../Components/user-management/user-management.component';
import { StatisticsComponent } from '../Components/statistics/statistics.component';
import { GroupComponent } from '../Components/group/group.component';
import { TeamComponent } from '../Components/team/team.component';
import { SuccessComponent } from '../Components/success/success.component';
import { PaymentDetailsComponent } from '../Components/payment-details/payment-details.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'profile',component:ProfileComponent},
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } ,
  { path: 'dashboard', component: DashboardComponent },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupComponent },
  { path: 'team', component: TeamComponent },
  { path: 'payment-details', component: PaymentDetailsComponent },
  { path: 'success', component: SuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
