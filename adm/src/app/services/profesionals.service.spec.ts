import { TestBed, inject } from '@angular/core/testing';

import { ProfesionalsService } from './profesionals.service';

describe('ProfesionalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfesionalsService]
    });
  });

  it('should be created', inject([ProfesionalsService], (service: ProfesionalsService) => {
    expect(service).toBeTruthy();
  }));
});
