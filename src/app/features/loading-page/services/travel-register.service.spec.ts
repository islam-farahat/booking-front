import { TestBed } from '@angular/core/testing';

import { TravelRegisterService } from './travel-register.service';

describe('TravelRegisterService', () => {
  let service: TravelRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
