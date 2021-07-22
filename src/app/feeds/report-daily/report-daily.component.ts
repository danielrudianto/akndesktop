import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-daily',
  templateUrl: './report-daily.component.html',
  styleUrls: ['./report-daily.component.css']
})
export class ReportDailyComponent implements OnInit {
  isSubmitting: boolean = false;
  date: FormControl = new FormControl(null, Validators.required)

  constructor(
    private reportService: ReportService,
    private _FileSaverService: FileSaverService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  downloadReport() {
    this.reportService.downloadDailyReport(this.date.value, this.router.snapshot.params.projectId).subscribe(data => {
      this._FileSaverService.save((<any>data), "Daily Report.pdf");
    })
  }

}
