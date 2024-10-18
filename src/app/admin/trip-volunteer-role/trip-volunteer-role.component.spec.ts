import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripVolunteerRoleComponent } from './trip-volunteer-role.component';

describe('TripVolunteerRoleComponent', () => {
  let component: TripVolunteerRoleComponent;
  let fixture: ComponentFixture<TripVolunteerRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripVolunteerRoleComponent]
    });
    fixture = TestBed.createComponent(TripVolunteerRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
