import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectGeneralComponent } from './edit-project-general.component';

describe('EditProjectGeneralComponent', () => {
  let component: EditProjectGeneralComponent;
  let fixture: ComponentFixture<EditProjectGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
