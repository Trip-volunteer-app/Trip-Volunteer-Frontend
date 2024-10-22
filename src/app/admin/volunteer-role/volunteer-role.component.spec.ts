import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerRoleComponent } from './volunteer-role.component';

describe('VolunteerRoleComponent', () => {
  let component: VolunteerRoleComponent;
  let fixture: ComponentFixture<VolunteerRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VolunteerRoleComponent]
    });
    fixture = TestBed.createComponent(VolunteerRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
