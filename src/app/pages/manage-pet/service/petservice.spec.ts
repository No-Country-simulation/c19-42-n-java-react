import { TestBed } from '@angular/core/testing';

import { PetService } from './pet.service';

describe('PetserviceService', () => {
  let service: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
