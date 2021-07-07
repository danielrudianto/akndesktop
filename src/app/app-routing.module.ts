import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './settings/tasks/tasks.component';
import { UsersDetailComponent } from './settings/users/users-detail/users-detail.component';
import { UsersMainComponent } from './settings/users/users-main/users-main.component';
import { UsersComponent } from './settings/users/users.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    pathMatch: "full",
    canActivate: [AuthGuardService],
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
  },
  {
    path: "Settings",
    component: SettingsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "Users",
        component: UsersComponent,
        canActivate: [AuthGuardService],
        children: [
          {
            path: "",
            component: UsersMainComponent,
            canActivate: [AuthGuardService]
          },
          {
            path: ":email",
            component: UsersDetailComponent,
            canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: "Tasks",
        component: TasksComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "**",
        redirectTo: "Users"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
