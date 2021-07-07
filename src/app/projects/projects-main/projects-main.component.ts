import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-main',
  templateUrl: './projects-main.component.html',
  styleUrls: ['./projects-main.component.css']
})
export class ProjectsMainComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToCreateProject() {
    this.router.navigate(["/Projects/Create"]);
  }

}
