import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxMaskModule } from 'ngx-mask';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsAddComponent, ClientsComponent, ClientsDeleteComponent, ClientsEditComponent } from './clients/clients.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/main/main.component';
import { SideProfileComponent } from './dashboard/side-profile/side-profile.component';
import { LoginComponent } from './login/login.component';
import { ConfirmProjectDetailComponent } from './projects/confirm-project-detail/confirm-project-detail.component';
import { ConfirmProjectComponent } from './projects/confirm-project/confirm-project.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectsMainComponent } from './projects/projects-main/projects-main.component';
import { ProjectsComponent } from './projects/projects.component';
import { SelectClientComponent } from './select-client/select-client.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './settings/tasks/tasks.component';
import { ContactAddComponent, ContactComponent, ContactDeleteComponent, ContactEditComponent } from './settings/users/users-detail/contact/contact.component';
import { PositionComponent } from './settings/users/users-detail/position/position.component';
import { UsersDetailComponent } from './settings/users/users-detail/users-detail.component';
import { UsersAddComponent, UsersDeleteComponent, UsersEditComponent, UsersMainComponent } from './settings/users/users-main/users-main.component';
import { UsersComponent } from './settings/users/users.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatNativeDateModule } from '@angular/material/core';
import { GanttAddComponent, GanttAddGroupComponent, GanttChartComponent, GanttDetailComponent, GanttDetailGroupComponent, GanttEditComponent, GanttEditGroupComponent } from './gantt-chart/gantt-chart.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SettingsMainComponent } from './settings/settings-main/settings-main.component';
import { MatMenuModule } from '@angular/material/menu';
import { SelectUserComponent } from './select-user/select-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidenavComponent,
    SideProfileComponent,
    MainComponent,
    SettingsComponent,
    ClientsComponent,
    ProjectsComponent,
    UsersComponent,
    TasksComponent,
    ClientsAddComponent,
    ClientsEditComponent,
    ClientsDeleteComponent,
    UsersEditComponent,
    UsersAddComponent,
    UsersDeleteComponent,
    PositionComponent,
    ContactComponent,
    UsersDetailComponent,
    UsersMainComponent,
    ContactAddComponent,
    ContactEditComponent,
    ContactDeleteComponent,
    CreateProjectComponent,
    ProjectsMainComponent,
    EditProjectComponent,
    ConfirmProjectComponent,
    ConfirmProjectDetailComponent,
    ProjectDetailComponent,
    SelectClientComponent,
    GanttChartComponent,
    GanttAddComponent,
    GanttAddGroupComponent,
    GanttEditComponent,
    GanttDetailComponent,
    GanttEditGroupComponent,
    GanttDetailGroupComponent,
    SettingsMainComponent,
    SelectUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatMenuModule,
    NgxMaskModule.forRoot(),
    
  ],
  entryComponents: [
    ClientsAddComponent,
    ClientsEditComponent,
    ClientsDeleteComponent,
    UsersEditComponent,
    UsersAddComponent,
    UsersDeleteComponent,
    ContactAddComponent,
    ContactEditComponent,
    ContactDeleteComponent,
    SelectClientComponent,
    GanttAddComponent,
    GanttAddGroupComponent,
    GanttEditComponent,
    GanttDetailComponent,
    GanttDetailGroupComponent,
    GanttEditGroupComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
