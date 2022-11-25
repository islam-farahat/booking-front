import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDocumentComponent } from './bill-document.component';

describe('BillDocumentComponent', () => {
  let component: BillDocumentComponent;
  let fixture: ComponentFixture<BillDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
