import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideFeedComponent } from './side-feed.component';

describe('SideFeedComponent', () => {
  let component: SideFeedComponent;
  let fixture: ComponentFixture<SideFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
