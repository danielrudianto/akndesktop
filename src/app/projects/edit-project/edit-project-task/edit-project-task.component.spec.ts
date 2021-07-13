import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectTaskComponent } from './edit-project-task.component';

describe('EditProjectTaskComponent', () => {
  let component: EditProjectTaskComponent;
  let fixture: ComponentFixture<EditProjectTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
