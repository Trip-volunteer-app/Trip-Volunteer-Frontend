import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTestimonialComponent } from './manage-testimonial.component';

describe('ManageTestimonialComponent', () => {
  let component: ManageTestimonialComponent;
  let fixture: ComponentFixture<ManageTestimonialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTestimonialComponent]
    });
    fixture = TestBed.createComponent(ManageTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
