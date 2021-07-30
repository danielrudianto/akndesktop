import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { CodeProject } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';
import { SwiperComponent } from "swiper/angular";
import * as global from '../../global';

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
import { ImageViewWrapperDirective } from '../../image-view-wrapper/image-view-wrapper.directive';
import { FeedService } from '../../services/feed.service';
import { SocketService } from '../../services/socket.service';
import { ImageViewComponent } from '../../image-view/image-view.component';
import { Subscription } from 'rxjs';

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
  feeds: any[] = [];
  global: any = global;
  projects: CodeProject[] = [];
  isFetching: boolean = false;
  closeImageView: Subscription;

  projectsSubscribed: number[] = [];

  @ViewChild(ImageViewWrapperDirective, { static: false }) imageViewHost: ImageViewWrapperDirective;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private feedService: FeedService,
    private socketService: SocketService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.fetchProjects();

    this.socketService.socket.on("newToolReport", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newMaterialReport", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newProgressReport", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newWeatherReport", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newAttendanceReport", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      };
    })

    this.socketService.socket.on("newRFI", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          response.ProjectName = this.projects.filter(y => y.Id == response.CodeProjectId)[0].Name;
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("deleteFeed", (data: any) => {
      if (this.projectsSubscribed.includes(data.projectId)) {
        const index = this.feeds.findIndex(x => x.Id == data.reportId);
        this.feeds.splice(index, 1);
      }
    })
  }

  fetchProjects() {
    this.isFetching = true;
    this.projectService.getProjectsByUser().subscribe((responseData: CodeProject[]) => {
      this.projects = responseData;
      this.isFetching = false;

      responseData.forEach(x => {
        this.projectsSubscribed.push(x.Id!);
      })

      this.fetchFeeds();
    })
  }

  fetchFeeds() {
    this.feedService.getFeedsByUser().subscribe((responseData: any[]) => {
      responseData.forEach(x => {
        x.ProjectName = this.projects.filter(y => y.Id == x.CodeProjectId)[0].Name;
      })
      this.feeds = responseData;
    })
  }

  swiperConfig: any = {
    slidesPerView: 'auto',
    spaceBetween: 50,
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 1.2,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 1.5,
        spaceBetween: 40
      },
      1368: {
        slidesPerView: 1.8,
        spaceBetween: 40
      },
      1600: {
        slidePerView: 2.1,
        spaceBetween: 50
      }
    }
  }

  goToProject(project: CodeProject) {
    this.router.navigate(["/Feeds/" + project.Id]);
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
}
