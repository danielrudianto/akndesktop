import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProjectDetailComponent } from './confirm-project-detail.component';

describe('ConfirmProjectDetailComponent', () => {
  let component: ConfirmProjectDetailComponent;
  let fixture: ComponentFixture<ConfirmProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmProjectDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
