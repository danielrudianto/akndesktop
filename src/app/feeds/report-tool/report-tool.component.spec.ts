import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportToolComponent } from './report-tool.component';

describe('ReportToolComponent', () => {
  let component: ReportToolComponent;
  let fixture: ComponentFixture<ReportToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
