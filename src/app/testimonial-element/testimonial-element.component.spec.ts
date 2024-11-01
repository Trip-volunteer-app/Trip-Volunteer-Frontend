import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialElementComponent } from './testimonial-element.component';

describe('TestimonialElementComponent', () => {
  let component: TestimonialElementComponent;
  let fixture: ComponentFixture<TestimonialElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialElementComponent]
    });
    fixture = TestBed.createComponent(TestimonialElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
