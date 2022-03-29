import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCommentDialogComponent } from './form-comment-dialog.component';

describe('FormCommentDialogComponent', () => {
  let component: FormCommentDialogComponent;
  let fixture: ComponentFixture<FormCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCommentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
