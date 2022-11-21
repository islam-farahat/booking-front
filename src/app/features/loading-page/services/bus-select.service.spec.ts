import { TestBed } from '@angular/core/testing';

import { BusSelectService } from './bus-select.service';

describe('BusSelectService', () => {
  let service: BusSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
