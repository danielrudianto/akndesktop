import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportProgressComponent } from './edit-report-progress.component';

describe('EditReportProgressComponent', () => {
  let component: EditReportProgressComponent;
  let fixture: ComponentFixture<EditReportProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReportProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
