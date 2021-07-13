import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodeProject } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects-main',
  templateUrl: './projects-main.component.html',
  styleUrls: ['./projects-main.component.css']
})
export class ProjectsMainComponent implements OnInit {
  projects: CodeProject[] = [];
  records: number = 0;
  pageNumber: number = 1;
  isFetching: boolean = false;

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.getActiveProjects((this.pageNumber - 1) * 25).subscribe((responseData: any) => {
      this.projects = responseData.data;
      console.log(this.projects);
      this.records = responseData.count;
    })
  }

  goToProjectConfirm(project: CodeProject) {
    this.router.navigate(["/Projects/Confirm/" + project.Id]);
  }

  goToEditProject(project: CodeProject) {
    this.router.navigate(["/Projects/Edit/" + project.Id]);
  }

  updatePage(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.fetchProjects();
  }

  goToCreateProject() {
    this.router.navigate(["/Projects/Create"]);
  }

}
