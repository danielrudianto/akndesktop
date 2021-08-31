import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportToolComponent } from './edit-report-tool.component';

describe('EditReportToolComponent', () => {
  let component: EditReportToolComponent;
  let fixture: ComponentFixture<EditReportToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReportToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
