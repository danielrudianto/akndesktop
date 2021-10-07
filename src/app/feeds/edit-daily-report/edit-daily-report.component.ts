import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../services/report.service';
import * as global from '../../global';
import { MatDialog } from '@angular/material/dialog';
import { AddImageComponent } from '../report-daily/report-daily.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-daily-report',
  templateUrl: './edit-daily-report.component.html',
  styleUrls: ['./edit-daily-report.component.css']
})
export class EditDailyReportComponent implements OnInit {
  global: any = global;
  @Input('report') report: any;
  images: any[] = [];
  newImages: any[] = [];
  removedImages: number[] = [];
  isSubmitting: boolean = false;

  constructor(
    private reportService: ReportService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.reportService.getDailyReportExistingImages(this.router.snapshot.params.reportId).subscribe((data: any[]) => {
      this.images = data;
    })
  }

  acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg'];

  fileToBase64 = (file: File) => {
    return new Promise(resolve => {
      var reader = new FileReader();
      reader.onload = function (event) {
        resolve(event.target!.result);
      };

      reader.readAsDataURL(file);
    });
  };

  openAddImage() {
    const dialog = this.dialog.open(AddImageComponent, {
      data: [],
      minWidth: 600
    })

    dialog.afterClosed().subscribe(x => {
      if (x != null) {
        if (this.acceptedImageTypes.includes(x.file['type'])) {
          this.fileToBase64(x.file).then(base => {
            this.newImages.push({
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

  removeExistingImage(id: number) {
    this.images.splice(this.images.findIndex(x => x.Id == id), 1);
    this.removedImages.push(id);
  }

  removeImage(i: number) {
    this.newImages.splice(i, 1);
  }

  submitEditDailyReport() {
    const imageEmptyCaption = this.images.filter(x => x.Caption == "").length;
    const newImageEmptyCaption = this.newImages.filter(x => x.description == "").length;

    if (imageEmptyCaption == 0 && newImageEmptyCaption == 0) {
      this.isSubmitting = true;

      let formData: FormData = new FormData;
      formData.append("remove", JSON.stringify(this.removedImages));
      this.images.filter(x => !this.removedImages.includes(x.Id)).forEach(image => {
        formData.append(`EditCaption[${image.Id}]`, image.Caption);
      })

      this.newImages.forEach((image, index) => {
        formData.append(`File[${index}]`, image.file);
        formData.append(`Caption[${index}]`, image.description);
        formData.append(`Type[${index}]`, image.type);
      });

      formData.append("Files", this.newImages.length.toString());

      this.reportService.editDailyReport(formData, this.router.snapshot.params.reportId).subscribe(result => {
        this.isSubmitting = false;

        this.route.navigate(["/Feeds/" + this.report.CodeProjectId])
      }, error => {
        this.isSubmitting = false;
        this.snackBar.open(error.message, "Close", {
          duration: 2000
        })
      })
    } else {
      this.snackBar.open("Please fill in the captions.", "Close", {
        duration: 2000
      })
    }

    
  }

}
