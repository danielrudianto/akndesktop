import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Material } from '../../interfaces/report';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-material',
  templateUrl: './report-material.component.html',
  styleUrls: ['./report-material.component.css']
})
export class ReportMaterialComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  materials: Material[] = [];
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

  deleteMaterial(i: number) {
    this.materials.splice(i, 1);
  }

  submitMaterialReport() {
    this.isSubmitting = true;
    this.reportService.submitMaterialReport({
      CodeProjectId: parseInt(this.router.snapshot.params.projectId),
      CreatedBy: this.authService.getEmail(),
      Materials:this.materials
    }).subscribe(responseData => {
      this.isSubmitting = false;
      this.onSubmit.emit();
    }, error => {
        this.snackBar.open(error.message, "Close", {
          duration: 2000,
          panelClass:'snack-bar'
        })
      this.isSubmitting = false
    })
  }

}

@Component({
  selector: 'report-material-add',
  templateUrl: 'report-material-add.html'
})

export class ReportMaterialAddComponent {
  constructor(
    private dialogRef: MatDialogRef<ReportMaterialAddComponent>
  ) { }

  materialForm: FormGroup = new FormGroup({
    Name: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required),
    Quantity: new FormControl("", [Validators.required, Validators.min(0)]),
    Unit: new FormControl("", Validators.required)
  })

  onSubmit() {
    this.dialogRef.close({
      Name: this.materialForm.controls.Name.value,
      Description: this.materialForm.controls.Description.value,
      Quantity: this.materialForm.controls.Quantity.value,
      Unit: this.materialForm.controls.Unit.value,
      Status: 1
    })
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

}

@Component({
  selector: 'report-material-edit',
  templateUrl: 'report-material-edit.html'
})

export class ReportMaterialEditComponent {
  constructor(
    private dialogRef: MatDialogRef<ReportMaterialEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Material
  ) { }

  materialForm: FormGroup = new FormGroup({
    Name: new FormControl(this.data.Name, Validators.required),
    Description: new FormControl(this.data.Description, Validators.required),
    Quantity: new FormControl(this.data.Quantity, [Validators.required, Validators.min(0)]),
    Unit: new FormControl(this.data.Unit, Validators.required)
  })

  onSubmit() {
    this.dialogRef.close({
      Name: this.materialForm.controls.Name.value,
      Description: this.materialForm.controls.Description.value,
      Quantity: this.materialForm.controls.Quantity.value,
      Unit: this.materialForm.controls.Unit.value,
      Status: this.data.Status
    })
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

}
