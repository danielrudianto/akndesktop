import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    pathMatch: "full",
    //canActivate: [AuthGuardService],
  },
  {
    path: "Login",
    component: LoginComponent,
    data: { state: 'Login' }
  },
  {
    path: "Clients",
    component: ClientsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
