import { ComponentFixture, TestBed } from '@angular/core/testing';

import { formCommentDialogComponent } from './form-comment-dialog.component';

describe('formCommentDialogComponent', () => {
  let component: formCommentDialogComponent;
  let fixture: ComponentFixture<formCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ formCommentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(formCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
