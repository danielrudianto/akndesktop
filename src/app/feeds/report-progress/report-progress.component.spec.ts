import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProgressComponent } from './report-progress.component';

describe('ReportProgressComponent', () => {
  let component: ReportProgressComponent;
  let fixture: ComponentFixture<ReportProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
