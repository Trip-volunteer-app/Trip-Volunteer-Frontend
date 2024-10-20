import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTripsComponent } from './manage-trips.component';

describe('ManageTripsComponent', () => {
  let component: ManageTripsComponent;
  let fixture: ComponentFixture<ManageTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTripsComponent]
    });
    fixture = TestBed.createComponent(ManageTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
