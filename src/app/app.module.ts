import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxMaskModule } from 'ngx-mask';
import { SwiperModule } from 'swiper/angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsAddComponent, ClientsComponent, ClientsDeleteComponent, ClientsEditComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/main/main.component';
import { SideProfileComponent } from './dashboard/side-profile/side-profile.component';
import { GanttChartViewComponent, GanttViewDetailComponent, GanttViewDetailGroupComponent } from './gantt-chart-view/gantt-chart-view.component';
import { GanttAddComponent, GanttAddGroupComponent, GanttChartComponent, GanttDetailComponent, GanttDetailGroupComponent, GanttEditComponent, GanttEditGroupComponent } from './gantt-chart/gantt-chart.component';
import { LoginComponent } from './login/login.component';
import { ConfirmProjectDetailComponent } from './projects/confirm-project-detail/confirm-project-detail.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectsMainComponent } from './projects/projects-main/projects-main.component';
import { ProjectsComponent } from './projects/projects.component';
import { SelectClientComponent } from './select-client/select-client.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { SettingsMainComponent } from './settings/settings-main/settings-main.component';
import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './settings/tasks/tasks.component';
import { ContactAddComponent, ContactComponent, ContactDeleteComponent, ContactEditComponent } from './settings/users/users-detail/contact/contact.component';
import { PositionAddComponent, PositionComponent, PositionDeleteComponent, PositionDetailComponent } from './settings/users/users-detail/position/position.component';
import { UsersDetailComponent } from './settings/users/users-detail/users-detail.component';
import { UsersAddComponent, UsersDeleteComponent, UsersEditComponent, UsersMainComponent } from './settings/users/users-main/users-main.component';
import { UsersComponent } from './settings/users/users.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FeedsComponent } from './feeds/feeds.component';
import { MainFeedComponent } from './feeds/main-feed/main-feed.component';
import { SideFeedComponent } from './feeds/side-feed/side-feed.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReportMaterialComponent } from './feeds/report-material/report-material.component';
import { ReportToolComponent } from './feeds/report-tool/report-tool.component';
import { ReportAttendanceComponent } from './feeds/report-attendance/report-attendance.component';
import { ReportDailyComponent } from './feeds/report-daily/report-daily.component';
import { ReportProgressComponent } from './feeds/report-progress/report-progress.component';
import { ReportWeatherComponent } from './feeds/report-weather/report-weather.component';


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
    SelectUserComponent,
    GanttChartViewComponent,
    PositionAddComponent,
    PositionDeleteComponent,
    PositionDetailComponent,
    GanttViewDetailComponent,
    GanttViewDetailGroupComponent,
    FeedsComponent,
    MainFeedComponent,
    SideFeedComponent,
    ReportMaterialComponent,
    ReportToolComponent,
    ReportAttendanceComponent,
    ReportDailyComponent,
    ReportProgressComponent,
    ReportWeatherComponent
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
    SwiperModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
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
    GanttEditGroupComponent,
    PositionAddComponent,
    PositionDeleteComponent,
    PositionDetailComponent,
    GanttViewDetailComponent,
    GanttViewDetailGroupComponent
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
