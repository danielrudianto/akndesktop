import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectDocumentComponent } from './edit-project-document.component';

describe('EditProjectDocumentComponent', () => {
  let component: EditProjectDocumentComponent;
  let fixture: ComponentFixture<EditProjectDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
