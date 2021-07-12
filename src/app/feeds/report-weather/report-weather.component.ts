import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/report.service';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-report-weather',
  templateUrl: './report-weather.component.html',
  styleUrls: ['./report-weather.component.css']
})
export class ReportWeatherComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  selectedWeather: number = 0;
  isSubmitting: boolean = false;

  constructor(
    private reportService: ReportService,
    private router: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 30 },
    768: { slidesPerView: 1, spaceBetween: 40 },
    1024: { slidesPerView: 1, spaceBetween: 50 }
  };

  submitForm() {
    this.isSubmitting = true;
    this.reportService.submitWeatherReport({
      WeatherId: this.selectedWeather,
      CodeProjectId: parseInt(this.router.snapshot.params.projectId),
      CreatedBy: this.authService.getEmail()
    }).subscribe(responseData => {
      this.isSubmitting = false;
      this.onSubmit.emit();
    }, error => {
      this.isSubmitting = false;
      this.snackBar.open("Close", error.message, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 2000
      })
    })
  }

}
