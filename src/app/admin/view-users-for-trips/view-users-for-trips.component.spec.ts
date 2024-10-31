import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsersForTripsComponent } from './view-users-for-trips.component';

describe('ViewUsersForTripsComponent', () => {
  let component: ViewUsersForTripsComponent;
  let fixture: ComponentFixture<ViewUsersForTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUsersForTripsComponent]
    });
    fixture = TestBed.createComponent(ViewUsersForTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
