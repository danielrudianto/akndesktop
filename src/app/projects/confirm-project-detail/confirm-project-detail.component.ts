import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { CodeProject, TaskFormGroup } from '../../interfaces/project';
import { User } from '../../interfaces/user';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-confirm-project-detail',
  templateUrl: './confirm-project-detail.component.html',
  styleUrls: ['./confirm-project-detail.component.css']
})
export class ConfirmProjectDetailComponent implements OnInit {
  project: CodeProject = null;
  isSubmitting: boolean = false;
  isFetching: boolean = false;

  constructor(
    private projectService: ProjectService,
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
  }

  confirmProject() {
    this.projectService.confirmProject(this.project.Id!).subscribe(responseData => {
      this.route.navigate(['/Projects'])
    }, error => {
      this.snackBar.open(error.message, "Close");
    })
  }

  deleteProject() {
    this.projectService.deleteProject(this.project.Id!).subscribe(responseData => {
      this.route.navigate(['/Projects'])
    }, error => {
      this.snackBar.open(error.message, "Close");
    });
  }

  downloadFile(document: any) {
    this.projectService.downloadDocument(document.Url).subscribe(data => {
      this._FileSaverService.save((<any>data), document.Name);
    }, error => {
      this.snackBar.open(error.message, "Close");
    })
  }

}
