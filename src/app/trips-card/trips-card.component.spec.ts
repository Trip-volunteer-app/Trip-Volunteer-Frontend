import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsCardComponent } from './trips-card.component';

describe('TripsCardComponent', () => {
  let component: TripsCardComponent;
  let fixture: ComponentFixture<TripsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripsCardComponent]
    });
    fixture = TestBed.createComponent(TripsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
