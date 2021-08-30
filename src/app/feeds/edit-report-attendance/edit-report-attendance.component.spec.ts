import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportAttendanceComponent } from './edit-report-attendance.component';

describe('EditReportAttendanceComponent', () => {
  let component: EditReportAttendanceComponent;
  let fixture: ComponentFixture<EditReportAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReportAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
