import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeProject } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import * as global from '../../global';

@Component({
  selector: 'app-side-feed',
  templateUrl: './side-feed.component.html',
  styleUrls: ['./side-feed.component.css']
})
export class SideFeedComponent implements OnInit {
  project: any = null;
  global: any = global;

  constructor(
    private projectService: ProjectService,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.projectService.getProjectById(this.router.snapshot.params.projectId).subscribe((data: CodeProject) => {
      if (data.IsDelete) {
        this.route.navigate(['/']);
      } else {
        this.project = data;
      }      
    })
  }

}
