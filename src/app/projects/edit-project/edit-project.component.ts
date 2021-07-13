import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TaskFormGroup } from '../../interfaces/project';
import { User } from '../../interfaces/user';
import { EditProjectService } from '../../services/edit-project.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  projectId: number = 0;
  isFetching: boolean = false;

  generalUrl: string = "";
  documentUrl: string = "";
  userUrl: string = "";
  taskUrl: string = "";

  constructor(
    private router: ActivatedRoute,
    private projectService: ProjectService,
    private projectEditService: EditProjectService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.projectId = this.router.snapshot.params.projectId;

    this.generalUrl = "/Projects/Edit/" + this.router.snapshot.params.projectId;
    this.documentUrl = "/Projects/Edit/" + this.router.snapshot.params.projectId + "/Document";
    this.userUrl = "/Projects/Edit/" + this.router.snapshot.params.projectId + "/User";
    this.taskUrl = "/Projects/Edit/" + this.router.snapshot.params.projectId + "/Task";

    this.projectService.getProjectById(this.projectId).subscribe(data => {
      this.projectEditService.codeProject = data;
      this.isFetching = false;
    }, error => {
        this.isFetching = false;
        this.snackBar.open(error.message, "Close");
    })
  }

}
