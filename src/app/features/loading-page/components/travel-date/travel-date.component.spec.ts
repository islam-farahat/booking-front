import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDateComponent } from './travel-date.component';

describe('TravelDateComponent', () => {
  let component: TravelDateComponent;
  let fixture: ComponentFixture<TravelDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
