import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRfiComponent } from './report-rfi.component';

describe('ReportRfiComponent', () => {
  let component: ReportRfiComponent;
  let fixture: ComponentFixture<ReportRfiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRfiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
