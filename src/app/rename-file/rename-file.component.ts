import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-rename-file',
  templateUrl: './rename-file.component.html',
  styleUrls: ['./rename-file.component.css']
})
export class RenameFileComponent implements OnInit {
  fileName: FormControl = new FormControl("", Validators.required);
  isSubmitting: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RenameFileComponent>
  ) { }

  ngOnInit(): void {
    this.fileName.setValue(this.data.Name);
  }

  rename() {
    this.projectService.renameDocument(this.data.Id, this.fileName.value).subscribe(data => {
      this.dialogRef.close();
    }, error => {
        this.snackBar.open(error.message, "Close");
    })
  }

}
