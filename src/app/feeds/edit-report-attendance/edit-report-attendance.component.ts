import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WorkerReportForm } from '../../interfaces/report';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import { ReportAttendanceAddComponent, ReportAttendanceEditComponent } from '../report-attendance/report-attendance.component';

@Component({
  selector: 'app-edit-report-attendance',
  templateUrl: './edit-report-attendance.component.html',
  styleUrls: ['./edit-report-attendance.component.css']
})
export class EditReportAttendanceComponent implements OnInit {
  @Input('report') report: any;
  isSubmitting: boolean = false;
  workers: any[] = [];

  constructor(
    private dialog: MatDialog,
    private reportService: ReportService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.workers = this.report.Worker;
  }

  openAddAttendanceForm() {
    const dialog = this.dialog.open(ReportAttendanceAddComponent, {
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.workers.push({
          Name: data.Name,
          Quantity: data.Quantity
        })
      }
    })
  }

  addAttendance() {
    this.isSubmitting = true;
    const workerReportForm: WorkerReportForm = {
      Id: this.report.Id,
      CreatedBy: this.authService.getEmail(),
      CodeProjectId: this.report.CodeProjectId,
      Workers: this.workers
    }
    this.reportService.editWorkerReport(workerReportForm)
      .subscribe(responseData => {
        this.route.navigate(["/Feeds/" + this.report.CodeProjectId])
      }, error => {
        this.isSubmitting = false;
        this.snackBar.open(error.message, "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 2000
        })
      })
  }

  deleteAttendance(i: number) {
    this.workers.splice(i, 1);
  }

  openEditAttendanceForm(i: number) {
    const dialog = this.dialog.open(ReportAttendanceEditComponent, {
      disableClose: true,
      data: this.workers[i]
    })

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.workers[i] = data;
      }
    })
  }

}
