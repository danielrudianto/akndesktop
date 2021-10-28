import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-report-rfi',
  templateUrl: './report-rfi.component.html',
  styleUrls: ['./report-rfi.component.css']
})
export class ReportRfiComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  documentations: any[] = [];
  isSubmitting: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private authService: AuthService,
    private reportService: ReportService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  rfiForm: FormGroup = new FormGroup({
    Header: new FormControl("", Validators.required),
    AddressedFor: new FormControl("", Validators.required),
    Description: new FormControl("", Validators.required)
  })

  removeDocumentation(i: number) {
    this.documentations.splice(i, 1);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.documentations.push(event.target.files[0]);
    }
  }

  submitForm() {
    this.isSubmitting = true;
    const uploadData = new FormData();
    let processedItems = 0;

    if (this.documentations.length > 0) {
      this.documentations.forEach((documentation, index) => {
        imageCompression(documentation, {
          maxWidthOrHeight: 640
        }).then(compressed => {
          uploadData.append("File[" + index + "]", compressed, documentation.name);
          processedItems++;

          if (this.documentations.length == processedItems) {
            uploadData.append("Header", this.rfiForm.controls.Header.value);
            uploadData.append("AddressedFor", this.rfiForm.controls.AddressedFor.value);
            uploadData.append("Description", this.rfiForm.controls.Description.value);

            uploadData.append("ProjectId", this.router.snapshot.params.projectId);
            uploadData.append("Files", this.documentations.length.toString());
            uploadData.append("CreatedBy", this.authService.getEmail());

            this.reportService.submitRFI(uploadData).subscribe(response => {
              this.onSubmit.emit();
            }, error => {
              this.snackBar.open(error.message, "Close");
              this.isSubmitting = false;
            });
          }
        })
      })
    } else {
      uploadData.append("Header", this.rfiForm.controls.Header.value);
      uploadData.append("AddressedFor", this.rfiForm.controls.AddressedFor.value);
      uploadData.append("Description", this.rfiForm.controls.Description.value);

      uploadData.append("ProjectId", this.router.snapshot.params.projectId);
      uploadData.append("Files", this.documentations.length.toString());
      uploadData.append("CreatedBy", this.authService.getEmail());

      this.reportService.submitRFI(uploadData).subscribe(response => {
        this.onSubmit.emit();
      }, error => {
        this.snackBar.open(error.message, "Close");
        this.isSubmitting = false;
      });
    }
  }

}
