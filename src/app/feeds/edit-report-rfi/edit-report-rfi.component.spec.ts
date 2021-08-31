import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportRfiComponent } from './edit-report-rfi.component';

describe('EditReportRfiComponent', () => {
  let component: EditReportRfiComponent;
  let fixture: ComponentFixture<EditReportRfiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReportRfiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportRfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
