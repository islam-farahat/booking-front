import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeravalComponent } from './teraval.component';

describe('TeravalComponent', () => {
  let component: TeravalComponent;
  let fixture: ComponentFixture<TeravalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeravalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeravalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
