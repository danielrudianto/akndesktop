import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { ReportService } from '../../services/report.service';
import * as global from '../../global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-report-daily',
  templateUrl: './report-daily.component.html',
  styleUrls: ['./report-daily.component.css']
})
export class ReportDailyComponent implements OnInit {
  global: any = global;
  images: any[] = [];
  isSubmitting: boolean = false;
  date: FormControl = new FormControl(null, Validators.required);
  step: number = 1;
  availableImages: any[] = [];
  acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg'];
  @Output() onSubmit = new EventEmitter();

  constructor(
    private reportService: ReportService,
    private _FileSaverService: FileSaverService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.step = 1;
    this.availableImages = [];
    this.images = [];
  }

  downloadReport() {
    this.reportService.downloadDailyReport(this.date.value, this.router.snapshot.params.projectId).subscribe(data => {
      this._FileSaverService.save((<any>data), "Daily Report.pdf");
    })
  }

  next() {
    this.reportService.checkDailyReport(this.router.snapshot.params.projectId, this.date.value).subscribe(data => {
      this.step = 2;
      this.reportService.getDailyReportImages(this.router.snapshot.params.projectId, this.date.value).subscribe((data: any[]) => {
        if (data.length > 0) {
          this.availableImages = data;
        }
      })
    }, error => {
        this.snackBar.open("Daily report has created.", "Close", {
          duration: 2000
        })
    });
  }

  fileToBase64 = (file: File) => {
    return new Promise(resolve => {
      var reader = new FileReader();
      reader.onload = function(event) {
        resolve(event.target!.result);
      };

      reader.readAsDataURL(file);
    });
  };

  openAddImage() {
    const dialog = this.dialog.open(AddImageComponent, {
      data: this.availableImages,
      minWidth: 600
    })

    dialog.afterClosed().subscribe(x => {
      if (x != null) {
        if (this.acceptedImageTypes.includes(x.file['type'])) {
          this.fileToBase64(x.file).then(base => {
            this.images.push({
              file: x.file,
              description: "",
              url: base
            });
          })
        } else {
          this.snackBar.open("Input only supports JPG, JPEG, and PNG.", "Close", {
            duration: 2000
          })
        }
        
      }
    })
  }

  submitDailyReport() {
    if (this.images.filter(x => x.description == "").length > 0) {
      this.snackBar.open("Please fill in the image captions", "Close", {
        duration: 2000
      })
    } else if (this.images.length == 0) {
      this.snackBar.open("Please insert documentation(s)", "Close", {
        duration: 2000
      })
    } else {
      this.isSubmitting = true;
      let formData: FormData = new FormData();
      let proccessedItems = 0;
      this.images.forEach((image, index) => {
        imageCompression(image.file, {
          maxWidthOrHeight: 640
        }).then(compressed => {
          formData.append(`File[${index}]`, compressed);
          formData.append(`Caption[${index}]`, image.description);
          formData.append(`Type[${index}]`, image.type);

          proccessedItems++;

          if (this.images.length == proccessedItems) {
            formData.append("CreatedBy", this.authService.getEmail());
            formData.append("Files", this.images.length.toString());
            this.reportService.submitDailyReport(formData, this.router.snapshot.params.projectId, this.date.value).subscribe(result => {
              this.isSubmitting = false;
              this.onSubmit.emit();
            }, error => {
              this.snackBar.open(error.message, "Close", {
                duration: 2000
              })
            })
          }
        })
      });
    }
  }

}

@Component({
  selector: 'add-image',
  templateUrl: './add-image.html',
  styleUrls:['./report-daily.component.css']
})

export class AddImageComponent {
  global: any = global;

  constructor(
    private dialogRef: MatDialogRef<AddImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]
  ) { }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.dialogRef.close({
        file: file
      });
      reader.readAsDataURL(file);
    }
  }

  async selectImage(image: string, name: string) {
    let response = await fetch(image);
    let data = await response.blob();
    const type = "image/" + name.split(".").pop();
    let file = new File([data], name, { type: type });
    this.dialogRef.close({
      file: file
    });
  }

}
