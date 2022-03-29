import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { FormMapDialogComponent } from './form-map-dialog.component';

describe('FormMapDialogComponent', () => {
  let component: FormMapDialogComponent;
  let fixture: ComponentFixture<FormMapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMapDialogComponent ],
      imports: [ LeafletModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
