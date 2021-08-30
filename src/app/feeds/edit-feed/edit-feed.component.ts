import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-edit-feed',
  templateUrl: './edit-feed.component.html',
  styleUrls: ['./edit-feed.component.css']
})
export class EditFeedComponent implements OnInit {
  reportId: number = 0;
  report: any = null;

  constructor(
    private router: ActivatedRoute,
    private feedService: FeedService
  ) { }

  ngOnInit(): void {
    this.reportId = this.router.snapshot.params.reportId;
    this.feedService.getFeed(this.reportId).subscribe((data: any) => {
      this.report = data;
    })
  }

}
