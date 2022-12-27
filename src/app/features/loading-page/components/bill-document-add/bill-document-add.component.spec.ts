import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDocumentAddComponent } from './bill-document-add.component';

describe('BillDocumentAddComponent', () => {
  let component: BillDocumentAddComponent;
  let fixture: ComponentFixture<BillDocumentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillDocumentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillDocumentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
