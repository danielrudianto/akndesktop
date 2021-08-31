import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImageViewWrapperDirective } from '../../image-view-wrapper/image-view-wrapper.directive';
import { ImageViewComponent } from '../../image-view/image-view.component';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import * as global from '../../global';

@Component({
  selector: 'app-edit-report-progress',
  templateUrl: './edit-report-progress.component.html',
  styleUrls: ['./edit-report-progress.component.css']
})
export class EditReportProgressComponent implements OnInit {
  @Input('report') report: any;
  isSubmitting: boolean = false;
  documentations: any[] = [];
  newDocumentations: any[] = [];

  deletedDocumentations: any[] = [];

  progress: string = "";
  @ViewChild(ImageViewWrapperDirective, { static: false }) imageViewHost: ImageViewWrapperDirective;
  closeImageView: Subscription;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private reportService: ReportService,
    private authService: AuthService,
    private snack: MatSnackBar,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.progress = this.report.StatusReport.Status;
    this.report.StatusReport.StatusReportImage.forEach((x: any) => {
      this.documentations.push({
        Id: x.Id,
        name: x.Name,
        ImageUrl: x.ImageUrl
      })
    })
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.newDocumentations.push(event.target.files[0]);
    }
  }

  submitForm() {
    this.isSubmitting = true;
    const uploadData = new FormData();
    this.newDocumentations.forEach((documentation, index) => {
      uploadData.append("File[" + index + "]", documentation, documentation.name);
    })

    const deleteId: any[] = [];
    this.deletedDocumentations.forEach((x, indexD) => {
      deleteId.push(x.Id);
    })
    uploadData.append("Delete", JSON.stringify(deleteId));

    uploadData.append("Progress", this.progress);
    uploadData.append("Files", this.newDocumentations.length.toString());
    uploadData.append("DeleteFiles", this.deletedDocumentations.length.toString());
    uploadData.append("ProjectId", this.report.CodeProjectId);
    uploadData.append("Id", this.report.Id);

    this.reportService.editProgressReport(uploadData).subscribe(response => {
      this.isSubmitting = false;
      this.route.navigate(["/Feeds/" + this.report.CodeProjectId]);
    }, error => {
      this.snack.open(error.message, "Close", {
        duration: 2000,
        panelClass: 'snack-bar',
      });
    });
  }

  removeDocumentation(i: number) {
    this.deletedDocumentations.push(this.documentations[i]);
    this.documentations[i].IsDelete = true;
  }

  removeNewDocumentation(i: number) {
    this.newDocumentations.splice(i, 1);
  }

  viewImage(i: number) {
    const imageComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ImageViewComponent);
    const imageContainerRef = this.imageViewHost.viewContainerRef;
    imageContainerRef.clear();

    const componentRef = imageContainerRef.createComponent(imageComponentFactory);
    componentRef.instance.imageUrl = {
      image: global.url + "/img/" + this.documentations[i].ImageUrl,
      title: this.documentations[i].name
    }

    this.closeImageView = componentRef.instance.close.subscribe(() => {
      this.closeImageView.unsubscribe();
      imageContainerRef.clear();
    })
  }

  retrieveDocumentation(y: any) {
    this.deletedDocumentations.splice(this.deletedDocumentations.findIndex(x => x.Id == y.Id), 1);
    this.documentations.filter(x => x.Id == y.Id)[0].IsDelete = false;
  }

}
