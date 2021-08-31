import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Tool, ToolReportForm } from '../../interfaces/report';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-tool',
  templateUrl: './report-tool.component.html',
  styleUrls: ['./report-tool.component.css']
})
export class ReportToolComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  tools: Tool[] = [];
  isSubmitting: boolean = false;

  constructor(
    private dialog: MatDialog,
    private reportService: ReportService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  openAddTool() {
    const dialog = this.dialog.open(ReportToolAddComponent, {
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.tools.push(data as Tool);
      }
    })
  }

  openEditTool(i: number) {
    const dialog = this.dialog.open(ReportToolEditComponent, {
      data: this.tools[i],
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.tools[i] = data;
      }
    })
  }

  deleteTool(i: number) {
    this.tools.splice(i, 1);
  }

  submitToolReport() {
    this.isSubmitting = true;
    const toolReportForm: ToolReportForm = {
      CreatedBy: this.authService.getEmail(),
      CodeProjectId: parseInt(this.router.snapshot.params.projectId),
      Tools: this.tools
    }

    this.reportService.submitToolReport(toolReportForm)
      .subscribe(responseData => {
        this.isSubmitting = false;
        this.tools = [];
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
  selector: 'report-tool-add',
  templateUrl: 'report-tool-add.html'
})

export class ReportToolAddComponent {
  constructor(
    private dialogRef: MatDialogRef<ReportToolAddComponent>
  ) { }

  toolForm: FormGroup = new FormGroup({
    Name: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required),
    Quantity: new FormControl("", [Validators.required, Validators.min(0)])
  })

  onSubmit() {
    this.dialogRef.close({
      Name: this.toolForm.controls.Name.value,
      Description: this.toolForm.controls.Description.value,
      Quantity: this.toolForm.controls.Quantity.value
    })
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}

@Component({
  selector: 'report-tool-edit',
  templateUrl: 'report-tool-edit.html'
})

export class ReportToolEditComponent {
  constructor(
    private dialogRef: MatDialogRef<ReportToolEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tool
  ) { }

  toolForm: FormGroup = new FormGroup({
    Name: new FormControl(this.data.Name, Validators.required),
    Description: new FormControl(this.data.Description, Validators.required),
    Quantity: new FormControl(this.data.Quantity, [Validators.required, Validators.min(0)])
  })

  onSubmit() {
    this.dialogRef.close({
      Name: this.toolForm.controls.Name.value,
      Description: this.toolForm.controls.Description.value,
      Quantity: this.toolForm.controls.Quantity.value
    })
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
