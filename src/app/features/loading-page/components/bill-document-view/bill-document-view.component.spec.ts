import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDocumentViewComponent } from './bill-document-view.component';

describe('BillDocumentViewComponent', () => {
  let component: BillDocumentViewComponent;
  let fixture: ComponentFixture<BillDocumentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillDocumentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
