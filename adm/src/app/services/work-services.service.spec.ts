import { TestBed, inject } from '@angular/core/testing';

import { WorkServicesService } from './work-services.service';

describe('WorkServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkServicesService]
    });
  });

  it('should be created', inject([WorkServicesService], (service: WorkServicesService) => {
    expect(service).toBeTruthy();
  }));
});
