import { TestBed, inject } from '@angular/core/testing';

import { UpdateHeaderService } from './update-header.service';

describe('UpdateHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateHeaderService]
    });
  });

  it('should be created', inject([UpdateHeaderService], (service: UpdateHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
