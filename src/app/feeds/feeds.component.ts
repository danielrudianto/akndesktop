import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit, OnDestroy {
  menuOpened: boolean = false;
  @ViewChild('drawer', { static: false }) drawer: any;

  constructor(
    private location: Location,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.router.snapshot);
  }

  ngOnDestroy(): void {

  }

  openMenu() {
    this.menuOpened = !this.menuOpened;
  }

  openReport(reportType: string) {
    this.location.go("Feeds/" + this.router.snapshot.params.projectId + "/Create/" + reportType);
  }

}
