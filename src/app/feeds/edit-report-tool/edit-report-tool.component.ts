import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool, ToolReportForm } from '../../interfaces/report';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import { ReportToolAddComponent, ReportToolEditComponent } from '../report-tool/report-tool.component';

@Component({
  selector: 'app-edit-report-tool',
  templateUrl: './edit-report-tool.component.html',
  styleUrls: ['./edit-report-tool.component.css']
})
export class EditReportToolComponent implements OnInit {
  @Input('report') report: any;
  isSubmitting: boolean = false;
  tools: Tool[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService,
    private reportService: ReportService,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.tools = this.report.Tool;
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
      Id: this.report.Id,
      CreatedBy: this.authService.getEmail(),
      CodeProjectId: parseInt(this.router.snapshot.params.projectId),
      Tools: this.tools
    }

    this.reportService.editToolReport(toolReportForm)
      .subscribe(responseData => {
        this.isSubmitting = false;
        this.tools = [];
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

}
