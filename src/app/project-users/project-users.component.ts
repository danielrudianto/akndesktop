import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import * as global from '../global';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.css']
})
export class ProjectUsersComponent implements OnInit {
  projects: any[] = [];
  selector: string = ".reportApprovalContainer";
  global: any = global;

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getProjectsByUser().subscribe(data => {
      this.projects = data;
    })
  }

}
