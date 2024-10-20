import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripImagesComponent } from './trip-images.component';

describe('TripImagesComponent', () => {
  let component: TripImagesComponent;
  let fixture: ComponentFixture<TripImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripImagesComponent]
    });
    fixture = TestBed.createComponent(TripImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
