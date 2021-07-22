import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { CodeProject } from '../../interfaces/project';
import { FeedService } from '../../services/feed.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: CodeProject = null;
  isSubmitting: boolean = false;
  isFetching: boolean = false;
  selectedType: number = 0;

  reports: any[] = [];
  reportsCount: number = 0;

  opened: boolean = true;

  constructor(
    private projectService: ProjectService,
    private feedService: FeedService,
    private router: ActivatedRoute,
    private route: Router,
    private snackBar: MatSnackBar,
    private _FileSaverService: FileSaverService
  ) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.projectService.getProjectById(this.router.snapshot.params.projectId).subscribe((responseData: CodeProject) => {
      if (responseData == null) {
        this.route.navigate(["/Projects"]);
      } else {
        this.project = responseData;
        this.isFetching = false;
      }
    }, error => {
      this.isFetching = false;
    })

    this.feedService.getFeedsProjectDetail(this.router.snapshot.params.projectId).subscribe((responseData: any) => {
      this.reports = responseData.data;
      this.reportsCount = responseData.count;
    })
  }

  breakpoints = {
    640: { slidesPerView: 1.5, spaceBetween: 10 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3.5, spaceBetween: 30 },
    1400: { slidesPerView: 5, spaceBetween: 40 }
  };

  changeReportType(type: number) {
    if (this.selectedType != type) {
      this.selectedType = type;
    }
  }

  downloadFile(document: any) {
    this.projectService.downloadDocument(document.Url).subscribe(data => {
      this._FileSaverService.save((<any>data), document.Name);
    }, error => {
        this.snackBar.open(error.message, "Close");
    })
  }

}
