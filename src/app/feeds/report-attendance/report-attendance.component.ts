import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Worker, WorkerReportForm } from '../../interfaces/report';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-attendance',
  templateUrl: './report-attendance.component.html',
  styleUrls: ['./report-attendance.component.css']
})
export class ReportAttendanceComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  workers: Worker[] = [];
  attendingWorkers: any[] = [];
  isSubmitting: boolean = false;

  constructor(
    private dialog: MatDialog,
    private reportService: ReportService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.reportService.fetchTodayWorker(parseInt(this.router.snapshot.params.projectId)).subscribe(responseData => {
      const response = responseData as any[];
      response.forEach((data: any) => {
        (data.Worker as any[]).forEach(worker => {
          this.attendingWorkers.push({
            Name: worker.Name,
            Quantity: worker.Quantity,
            Date: data.Date
          })
        })
      })
    })
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

  deleteAttendance(i: number) {
    this.workers.splice(i, 1);
  }

  addAttendance() {
    this.isSubmitting = true;
    const workerReportForm: WorkerReportForm = {
      CreatedBy: this.authService.getEmail(),
      CodeProjectId: parseInt(this.router.snapshot.params.projectId),
      Workers: this.workers
    }
    this.reportService.submitWorkerReport(workerReportForm)
      .subscribe(responseData => {
        this.workers = [];
        this.isSubmitting = false;
        this.onSubmit.emit();
      }, error => {
        this.isSubmitting = false;
        this.snackBar.open(error.message, "Close", {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 2000
        })
      })
  }
}

@Component({
  selector: 'report-attendance-add',
  templateUrl: 'report-attendance-add.html'
})

export class ReportAttendanceAddComponent {
  constructor(
    private dialogRef: MatDialogRef<ReportAttendanceAddComponent>
  ) {

  }

  attendanceForm: FormGroup = new FormGroup({
    Name: new FormControl("", Validators.required),
    Quantity: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  submitForm() {
    this.dialogRef.close({
      Name: this.attendanceForm.controls.Name.value,
      Quantity: parseInt(this.attendanceForm.controls.Quantity.value)
    })
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}

@Component({
  selector: 'report-attendance-edit',
  templateUrl: 'report-attendance-edit.html'
})

export class ReportAttendanceEditComponent {
  constructor(
    private dialogRef: MatDialogRef<ReportAttendanceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Worker
  ) { }

  attendanceForm: FormGroup = new FormGroup({
    Name: new FormControl(this.data.Name, Validators.required),
    Quantity: new FormControl(this.data.Quantity, [Validators.required, Validators.min(1)])
  })

  submitForm() {
    this.dialogRef.close({
      Name: this.attendanceForm.controls.Name.value,
      Quantity: parseInt(this.attendanceForm.controls.Quantity.value)
    })
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}

