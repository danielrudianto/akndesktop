import { Component, OnInit } from '@angular/core';
import { CodeProject } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { SwiperComponent } from "swiper/angular";

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
} from "swiper/core";
import { Router } from '@angular/router';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  projects: CodeProject[] = [];
  isFetching: boolean = false;

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.isFetching = true;
    this.projectService.getProjectsByUser().subscribe((responseData: CodeProject[]) => {
      this.projects = responseData;
      this.isFetching = false;
    })
  }

  breakpoints = {
    768: { slidesPerView: 1, spaceBetween: 20 },
    992: { slidesPerView: 1.5, spaceBetween: 20 },
    1200: { slidesPerView: 1.8, spaceBetween: 40 },
    1368: { slidesPerView: 2.1, spaceBetween: 40 }
  };

  goToProject(project: CodeProject) {
    this.router.navigate(["/Feeds/" + project.Id]);
  }

}
