import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocketService } from '../services/socket.service';

import { ReportCommentComponent } from './report-comment.component';

describe('ReportCommentComponent', () => {
  let component: ReportCommentComponent;
  let fixture: ComponentFixture<ReportCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportCommentComponent],
      providers: [SocketService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
