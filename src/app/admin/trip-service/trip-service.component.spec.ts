import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripServiceComponent } from './trip-service.component';

describe('TripServiceComponent', () => {
  let component: TripServiceComponent;
  let fixture: ComponentFixture<TripServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripServiceComponent]
    });
    fixture = TestBed.createComponent(TripServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
