import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedsComponent } from './feeds/feeds.component';
import { LoginComponent } from './login/login.component';
import { ConfirmProjectDetailComponent } from './projects/confirm-project-detail/confirm-project-detail.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectsMainComponent } from './projects/projects-main/projects-main.component';
import { ProjectsComponent } from './projects/projects.component';
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
  },
  {
    path: "Projects",
    component: ProjectsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        pathMatch: "full",
        component: ProjectsMainComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Create",
        component: CreateProjectComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Edit",
        component: EditProjectComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Confirm/:projectId",
        component: ConfirmProjectDetailComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "Detail/:projectId",
        component: ProjectDetailComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "**",
        redirectTo:""
      }
    ]
  },
  {
    path: "Feeds/:projectId",
    component: FeedsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
