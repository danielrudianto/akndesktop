import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportMaterialComponent } from './edit-report-material.component';

describe('EditReportMaterialComponent', () => {
  let component: EditReportMaterialComponent;
  let fixture: ComponentFixture<EditReportMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReportMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
