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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FileSaverModule } from 'ngx-filesaver';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMaskModule } from 'ngx-mask';
import { SwiperModule } from 'swiper/angular';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsAddComponent, ClientsComponent, ClientsDeleteComponent, ClientsEditComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './dashboard/main/main.component';
import { ResetPasswordComponent, SideProfileComponent } from './dashboard/side-profile/side-profile.component';
import { FeedsComponent } from './feeds/feeds.component';
import { MainFeedComponent, MainFeedDeleteComponent } from './feeds/main-feed/main-feed.component';
import { ReportAttendanceAddComponent, ReportAttendanceComponent, ReportAttendanceEditComponent } from './feeds/report-attendance/report-attendance.component';
import { ReportDailyComponent } from './feeds/report-daily/report-daily.component';
import { ReportMaterialAddComponent, ReportMaterialComponent, ReportMaterialEditComponent } from './feeds/report-material/report-material.component';
import { ReportProgressComponent } from './feeds/report-progress/report-progress.component';
import { ReportRfiComponent } from './feeds/report-rfi/report-rfi.component';
import { ReportToolAddComponent, ReportToolComponent, ReportToolEditComponent } from './feeds/report-tool/report-tool.component';
import { ReportWeatherComponent } from './feeds/report-weather/report-weather.component';
import { SideFeedComponent } from './feeds/side-feed/side-feed.component';
import { GanttChartViewComponent, GanttViewDetailComponent, GanttViewDetailGroupComponent } from './gantt-chart-view/gantt-chart-view.component';
import { GanttAddComponent, GanttAddGroupComponent, GanttChartComponent, GanttDetailComponent, GanttDetailGroupComponent, GanttEditComponent, GanttEditGroupComponent } from './gantt-chart/gantt-chart.component';
import { ImageViewWrapperDirective } from './image-view-wrapper/image-view-wrapper.directive';
import { ImageViewComponent } from './image-view/image-view.component';
import { LoginComponent } from './login/login.component';
import { ConfirmProjectDetailComponent } from './projects/confirm-project-detail/confirm-project-detail.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { EditProjectDocumentComponent } from './projects/edit-project/edit-project-document/edit-project-document.component';
import { EditProjectGeneralComponent } from './projects/edit-project/edit-project-general/edit-project-general.component';
import { EditProjectUserComponent } from './projects/edit-project/edit-project-user/edit-project-user.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectsMainComponent } from './projects/projects-main/projects-main.component';
import { ProjectsComponent } from './projects/projects.component';
import { SelectClientComponent } from './select-client/select-client.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { SocketService } from './services/socket.service';
import { SettingsMainComponent } from './settings/settings-main/settings-main.component';
import { SettingsComponent } from './settings/settings.component';
import { TasksAddGroupComponent, TasksComponent } from './settings/tasks/tasks.component';
import { ContactAddComponent, ContactComponent, ContactDeleteComponent, ContactEditComponent } from './settings/users/users-detail/contact/contact.component';
import { PositionAddComponent, PositionComponent, PositionDeleteComponent, PositionDetailComponent } from './settings/users/users-detail/position/position.component';
import { UsersDetailComponent } from './settings/users/users-detail/users-detail.component';
import { UsersAddComponent, UsersDeleteComponent, UsersEditComponent, UsersMainComponent } from './settings/users/users-main/users-main.component';
import { UsersComponent } from './settings/users/users.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProjectUsersComponent } from './project-users/project-users.component';
import { ReportApprovalComponent, ReportApprovalListComponent, ReportCommentListComponent } from './report-approval/report-approval.component';
import { ReportCommentComponent } from './report-comment/report-comment.component';
import { RfiAnswerComponent, RfiAnswerListComponent } from './rfi-answer/rfi-answer.component';
import { ReportApprovalCountPipe } from './pipes/report-approval-count.pipe';
import { ReportApprovalSignedPipe } from './pipes/report-approval-signed.pipe ';
import { ReportApprovalColorPipe } from './pipes/report-approval-color.pipe';
import { ReportTableComponent, ReportTableDetailComponent } from './projects/project-detail/report-table/report-table.component';
import { RenameFileComponent } from './rename-file/rename-file.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { JwtInterceptor } from './auth/jwt-interceptor';

import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { EditFeedComponent } from './feeds/edit-feed/edit-feed.component';
import { EditReportAttendanceComponent } from './feeds/edit-report-attendance/edit-report-attendance.component';
import { EditReportMaterialComponent } from './feeds/edit-report-material/edit-report-material.component';
import { EditReportToolComponent } from './feeds/edit-report-tool/edit-report-tool.component';
import { EditReportRfiComponent } from './feeds/edit-report-rfi/edit-report-rfi.component';
import { EditReportProgressComponent } from './feeds/edit-report-progress/edit-report-progress.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { FeedDetailComponent } from './feeds/feed-detail/feed-detail.component';

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
    ReportWeatherComponent,
    ReportToolAddComponent,
    ReportToolEditComponent,
    ReportMaterialAddComponent,
    ReportMaterialEditComponent,
    ReportAttendanceAddComponent,
    ReportAttendanceEditComponent,
    ReportRfiComponent,
    TasksAddGroupComponent,
    ImageViewComponent,
    ImageViewWrapperDirective,
    EditProjectGeneralComponent,
    EditProjectUserComponent,
    EditProjectDocumentComponent,
    ProjectUsersComponent,
    ReportApprovalComponent,
    ReportCommentComponent,
    RfiAnswerComponent,
    ReportApprovalCountPipe,
    ReportApprovalSignedPipe,
    ReportApprovalColorPipe,
    ReportApprovalListComponent,
    ReportCommentListComponent,
    MainFeedDeleteComponent,
    ReportTableComponent,
    RenameFileComponent,
    ReportTableDetailComponent,
    RfiAnswerListComponent,
    ReportDailyComponent,
    ResetPasswordComponent,
    EditFeedComponent,
    EditReportAttendanceComponent,
    EditReportMaterialComponent,
    EditReportToolComponent,
    EditReportRfiComponent,
    EditReportProgressComponent,
    FeedDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
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
    InfiniteScrollModule,
    NgxDocViewerModule,
    ClickOutsideModule,
    FileSaverModule,
    NgxMaskModule.forRoot(),
    NgImageFullscreenViewModule,
    AngularFireModule.initializeApp(environment.firebase),
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
    GanttViewDetailGroupComponent,
    TasksAddGroupComponent,
    ImageViewComponent,
    ReportApprovalListComponent,
    ReportCommentListComponent,
    MainFeedDeleteComponent,
    RenameFileComponent,
    ReportTableDetailComponent,
    RfiAnswerListComponent,
    ReportDailyComponent,
    ResetPasswordComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    MatDatepickerModule,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
