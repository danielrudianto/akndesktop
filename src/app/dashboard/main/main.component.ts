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

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.getProjectsByUser().subscribe((responseData: CodeProject[]) => {
      this.projects = responseData;
    })
  }

  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 40 },
    1024: { slidesPerView: 2.2, spaceBetween: 50 }
  };

  goToProject(project: CodeProject) {
    this.router.navigate(["/Feeds/" + project.Id]);
  }

}
