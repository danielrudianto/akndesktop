import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SideProfileComponent } from './dashboard/side-profile/side-profile.component';
import { MainComponent } from './dashboard/main/main.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SettingsComponent } from './settings/settings.component';
import { ClientsAddComponent, ClientsComponent, ClientsDeleteComponent, ClientsEditComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './settings/tasks/tasks.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NgxMaskModule } from 'ngx-mask';

import { UsersMainComponent, UsersEditComponent, UsersDeleteComponent, UsersAddComponent } from './settings/users/users-main/users-main.component';
import { PositionComponent } from './settings/users/users-detail/position/position.component';
import { ContactAddComponent, ContactComponent, ContactDeleteComponent, ContactEditComponent } from './settings/users/users-detail/contact/contact.component';
import { UsersDetailComponent } from './settings/users/users-detail/users-detail.component';
import { UsersComponent } from './settings/users/users.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    ContactDeleteComponent
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
    ContactDeleteComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
