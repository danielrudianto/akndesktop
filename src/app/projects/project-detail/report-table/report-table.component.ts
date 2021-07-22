import { Component, ComponentFactoryResolver, EventEmitter, Inject, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedService } from '../../../services/feed.service';
import * as global from '../../../global';
import { ImageViewWrapperDirective } from '../../../image-view-wrapper/image-view-wrapper.directive';
import { ImageViewComponent } from '../../../image-view/image-view.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent implements OnInit, OnChanges {
  @Input() type: number;
  @Input() projectId: number;

  reports: any[] = [];
  records: number = 0;
  pageNumber: number = 1;

  constructor(
    private feedService: FeedService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.type
  }

  ngOnChanges(): void {
    if (this.type != 0) {
      this.reports = [];
      this.records = 0;
      this.pageNumber = 1;

      this.fetchFeeds(0);
    }
  }

  fetchFeeds(offset: number = (this.pageNumber - 1) * 10) {
    this.feedService.getFeedsProjectDetailType(this.projectId, this.type, offset).subscribe((data: any) => {
      this.reports = data.data;
      this.records = data.count;
    }, error => {
        this.snackBar.open(error.message, "Close");
    })
  }

  openReport(id: number) {
    const dialog = this.dialog.open(ReportTableDetailComponent, {
      data: id,
      minWidth:400
    })
  }

  updatePage(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.fetchFeeds();
  }
}

@Component({
  selector: 'report-table-detail',
  templateUrl: 'report-table-detail.html',
  styleUrls:['report-table-detail.css']
})

export class ReportTableDetailComponent implements OnInit {
  global: any = global;
  @ViewChild(ImageViewWrapperDirective, { static: false }) imageViewHost: ImageViewWrapperDirective;
  closeImageView: Subscription;

  constructor(
    private dialogRef: MatDialogRef<ReportTableDetailComponent>,
    private feedService: FeedService,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  report: any;

  ngOnInit(): void {
    this.feedService.getFeed(this.data).subscribe(response => {
      this.report = response;
    })
  }

  viewImage(imageUrl: string) {
    const imageComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ImageViewComponent);
    const imageContainerRef = this.imageViewHost.viewContainerRef;
    imageContainerRef.clear();

    const componentRef = imageContainerRef.createComponent(imageComponentFactory);
    componentRef.instance.imageUrl = global.url + "/img/" + imageUrl;
    this.closeImageView = componentRef.instance.close.subscribe(() => {
      this.closeImageView.unsubscribe();
      imageContainerRef.clear();
    })
  }
}
