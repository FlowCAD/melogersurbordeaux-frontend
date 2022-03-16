import { TestBed } from '@angular/core/testing';

import { ApartService } from './apart.service';

describe('ApartService', () => {
  let service: ApartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
