import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit, OnDestroy {
  menuOpened: boolean = false;
  selectedReport: any = null;
  @ViewChild('drawer', { static: false }) drawer: any;

  constructor(
    private router: ActivatedRoute,
    private socketService: SocketService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.socketService.socket.on("deleteProject", (data: any) => {
      if (this.router.snapshot.params.projectId == data.projectId) {
        this.route.navigate(["/"]);
      }
    })
  }

  ngOnDestroy(): void {

  }

  openMenu() {
    this.menuOpened = !this.menuOpened;
  }

  closeMenu() {
    this.menuOpened = false;
    this.selectedReport = null;
  }

  openReport(reportType: string) {
    switch (reportType) {
      case 'Attendance':
        this.selectedReport = reportType;
        this.openMenu();
        break;
      case 'Daily':
        this.selectedReport = reportType;
        this.openMenu();
        break;
      case 'Weather':
        this.selectedReport = reportType;
        this.openMenu();
        break;
      case 'Progress':
        this.selectedReport = reportType;
        this.openMenu();
        break;
      case 'Tool':
        this.selectedReport = reportType;
        this.openMenu();
        break;
      case 'Material':
        this.selectedReport = reportType;
        this.openMenu();
        break;
      case 'RFI':
        this.selectedReport = reportType;
        this.openMenu();
        break;
      case 'Approval':
        this.selectedReport = reportType;
        this.openMenu();
        break;
    }
  }

}
