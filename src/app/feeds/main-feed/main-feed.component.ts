import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedService } from '../../services/feed.service';
import * as global from '../../global';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {
  feeds: any[] = [];
  global: any = global;

  constructor(
    private feedService: FeedService,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar,
    private socketService: SocketService,
    private route: Router
  ) { }

  fetchFeeds() {
    this.feedService.getFeeds(this.router.snapshot.params.projectId, this.feeds.length).subscribe(response => {
      response.forEach((x, index) => {
        this.feeds.push(x);
      })
    }, error => {
        this.snackBar.open(error.message, "Close");
    })
  }

  ngOnInit(): void {
    this.fetchFeeds();

    this.socketService.socket.on("newToolReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newMaterialReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newProgressReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("newWeatherReport", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.feedService.getFeed(data.reportId).subscribe(response => {
          this.feeds.unshift(response);
        })
      }
    })

    this.socketService.socket.on("deleteProject", (data: any) => {
      if (data.projectId == this.router.snapshot.params.projectId) {
        this.route.navigate(["/"]);
      }
    })
  }

  selector: string = '.feed-container';

  onScroll() {
    this.fetchFeeds();
  }

}
