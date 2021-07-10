import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWeatherComponent } from './report-weather.component';

describe('ReportWeatherComponent', () => {
  let component: ReportWeatherComponent;
  let fixture: ComponentFixture<ReportWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
