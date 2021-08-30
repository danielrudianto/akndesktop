import { Component, ComponentFactoryResolver, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedService } from '../../services/feed.service';
import * as global from '../../global';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from '../../services/socket.service';
import { ImageViewComponent } from '../../image-view/image-view.component';
import { ImageViewWrapperDirective } from '../../image-view-wrapper/image-view-wrapper.directive';
import { Subscription } from 'rxjs';
import { ApprovalService } from '../../services/approval.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Approvals } from '../../interfaces/report';
import { ReportService } from '../../services/report.service';
import { ReportApprovalListComponent } from '../../report-approval/report-approval.component';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {
  feeds: any[] = [];
  global: any = global;
  closeImageView: Subscription;
  selector: string = '.feed-container';
  isFetching: boolean = false;

  @ViewChild(ImageViewWrapperDirective, { static: false }) imageViewHost: ImageViewWrapperDirective;

  constructor(
    private feedService: FeedService,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar,
    private socketService: SocketService,
    private route: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialog: MatDialog,
    private approvalService: ApprovalService
  ) { }

  fetchFeeds() {
    this.isFetching = true;
    this.feedService.getFeeds(this.router.snapshot.params.projectId, this.feeds.length).subscribe(response => {
      response.forEach((x, index) => {
        this.feeds.push(x);
      })

      this.isFetching = false;
    }, error => {
        this.isFetching = false;
        this.snackBar.open(error.message, "Close");
    })
  }

  viewImage(imageUrl: any) {
    const imageComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ImageViewComponent);
    const imageContainerRef = this.imageViewHost.viewContainerRef;
    imageContainerRef.clear();

    const componentRef = imageContainerRef.createComponent(imageComponentFactory);
    componentRef.instance.imageUrl = {
      image: global.url + "/img/" + imageUrl.ImageUrl,
      title: imageUrl.Name
    }
    this.closeImageView = componentRef.instance.close.subscribe(() => {
      this.closeImageView.unsubscribe();
      imageContainerRef.clear();
    })
  }

  ngOnInit(): void {
    this.fetchFeeds();

    this.socketService.socket.on("newToolReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newMaterialReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newProgressReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newWeatherReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newAttendanceReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newRFI", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("deleteProject", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.route.navigate(["/"]);
      }
    })

    this.socketService.socket.on("deleteFeed", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        const index = this.feeds.findIndex(x => x.Id == data.reportId);
        this.feeds.splice(index, 1);
      }
    })

    this.socketService.socket.on("newApproval", (data: any) => {
      const index = this.feeds.findIndex(x => x.Id == data.CodeReportId);
      if (index > -1) {
        if (data.Approval == 0) {
          (this.feeds[index].CodeReportApprovalComment as any[]).unshift(data);
        } else {
          (this.feeds[index].CodeReportApproval as any[]).push(data);
        }
        
      }
    })

    this.socketService.socket.on("newAnswer", (data: any) => {
      const index = this.feeds.findIndex(x => x.Id == data.RequestForInformation.CodeReportId);
      if (index > -1) {
        (this.feeds[index].RequestForInformation.RequestForInformationAnswer as any[]).unshift(data);
      }
    })

    this.socketService.socket.on("deleteApproval", (data: any) => {
      const index = this.feeds.findIndex(x => x.Id == data.CodeReportId);
      if (index > -1) {
        const approvalIndex = (this.feeds[index].CodeReportApproval as any[]).findIndex(x => x.Id == data.Id);
        if (approvalIndex > -1) {
          (this.feeds[index].CodeReportApproval as any[]).splice(approvalIndex, 1);
        }

        const commentIndex = (this.feeds[index].CodeReportApprovalComment as any[]).findIndex(x => x.Id == data.Id);
        if (commentIndex > -1) {
          this.approvalService.getCommentsDisplay(this.feeds[index].Id).subscribe((data: any[]) => {
            (this.feeds[index].CodeReportApprovalComment as any[]) = data;
          })
        }
      }
    })

    this.socketService.socket.on("editAttendanceReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds[this.feeds.findIndex(x => x.Id == data.reportId)] = response;
        })
      }
    })
  }

  deleteFeed(feed: any) {
    this.dialog.open(MainFeedDeleteComponent, {
      data: feed
    })
  }

  deleteApprovals(id: number) {
    this.dialog.open(MainFeedDeleteComponent, {
      data: id
    })
  }

  onScroll() {
    this.fetchFeeds();
  }

  openApprovals(id: number) {
    this.dialog.open(ReportApprovalListComponent, {
      data: id,
      maxHeight: '100%',
      minWidth: 400
    })
  }

  goToEditFeed(id: number) {
    this.route.navigate(["/Feeds/Edit/" + id]);
  }

}

@Component({
  selector: 'main-feed-delete',
  templateUrl: 'main-feed-delete.html'
})

export class MainFeedDeleteComponent {
  isSubmitting: boolean = false;

  constructor(
    private reportService: ReportService,
    private dialogRef: MatDialogRef<MainFeedDeleteComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  confirmationText: string = Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString()
  confirmation: string = "";

  submit() {
    this.isSubmitting = true;
    this.reportService.deleteReport(this.data.Id).subscribe(data => {
      this.dialogRef.close({ error: false })
    }, error => {
        this.snackBar.open(error.message, "Close");
        this.isSubmitting = false;
    })
  }
}
