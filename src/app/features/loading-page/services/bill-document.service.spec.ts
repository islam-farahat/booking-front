import { TestBed } from '@angular/core/testing';

import { BillDocumentService } from './bill-document.service';

describe('BillDocumentService', () => {
  let service: BillDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
