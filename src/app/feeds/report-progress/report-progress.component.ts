import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-report-progress',
  templateUrl: './report-progress.component.html',
  styleUrls: ['./report-progress.component.css']
})
export class ReportProgressComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  isSubmitting: boolean = false;
  documentations: any[] = [];
  progress: string = "";

  constructor(
    private router: ActivatedRoute,
    private reportService: ReportService,
    private authService: AuthService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
  }


  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 3, spaceBetween: 50 }
  };

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.documentations.push(event.target.files[0]);
    }
  }

  submitForm() {
    this.isSubmitting = true;
    let processedItems = 0;
    const uploadData = new FormData();

    if (this.documentations.length > 0) {
      this.documentations.forEach((documentation, index) => {
        imageCompression(documentation, {
          maxWidthOrHeight: 640
        }).then(compressed => {
          uploadData.append("file[" + index + "]", compressed, documentation.name);
          processedItems++;

          if (this.documentations.length == processedItems) {
            uploadData.append("Progress", this.progress);
            uploadData.append("ProjectId", this.router.snapshot.params.projectId);
            uploadData.append("Files", this.documentations.length.toString());
            uploadData.append("CreatedBy", this.authService.getEmail());

            this.reportService.submitProgressReport(uploadData).subscribe(response => {
              this.onSubmit.emit();
            }, error => {
              this.snack.open(error.message, "Close",);
              this.isSubmitting = false;
            });
          }
        })
      })
    } else {
      uploadData.append("Progress", this.progress);
      uploadData.append("ProjectId", this.router.snapshot.params.projectId);
      uploadData.append("Files", this.documentations.length.toString());
      uploadData.append("CreatedBy", this.authService.getEmail());

      this.reportService.submitProgressReport(uploadData).subscribe(response => {
        this.onSubmit.emit();
      }, error => {
        this.snack.open(error.message, "Close",);
        this.isSubmitting = false;
      });
    }
    
  }

  removeDocumentation(i: number) {
    this.documentations.splice(i, 1);
  }

}
