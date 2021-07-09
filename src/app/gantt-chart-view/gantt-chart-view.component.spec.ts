import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttChartViewComponent } from './gantt-chart-view.component';

describe('GanttChartViewComponent', () => {
  let component: GanttChartViewComponent;
  let fixture: ComponentFixture<GanttChartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanttChartViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
