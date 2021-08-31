import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from '../../interfaces/report';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import { ReportMaterialAddComponent, ReportMaterialEditComponent } from '../report-material/report-material.component';

@Component({
  selector: 'app-edit-report-material',
  templateUrl: './edit-report-material.component.html',
  styleUrls: ['./edit-report-material.component.css']
})
export class EditReportMaterialComponent implements OnInit {
  @Input('report') report: any;
  materials: Material[] = [];
  isSubmitting: boolean = false;

  constructor(
    private dialog: MatDialog,
    private reportService: ReportService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.materials = this.report.Material;
  }

  deleteMaterial(i: number) {
    this.materials.splice(i, 1);
  }

  submitMaterialReport() {
    this.isSubmitting = true;
    this.reportService.editMaterialReport({
      Id: this.report.Id,
      CodeProjectId: parseInt(this.router.snapshot.params.projectId),
      CreatedBy: this.authService.getEmail(),
      Materials: this.materials
    }).subscribe(responseData => {
      this.isSubmitting = false;
      this.route.navigate(["/Feeds/" + this.report.CodeProjectId])
    }, error => {
      this.snackBar.open(error.message, "Close", {
        duration: 2000,
        panelClass: 'snack-bar'
      })
      this.isSubmitting = false
    })
  }

  openEditMaterial(i: number) {
    const dialog = this.dialog.open(ReportMaterialEditComponent, {
      data: this.materials[i],
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.materials[i] = data;
      }
    })
  }

  openAddMaterial() {
    const dialog = this.dialog.open(ReportMaterialAddComponent, {
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if (data != null) {
        this.materials.push(data as Material);
      }
    })
  }

}
