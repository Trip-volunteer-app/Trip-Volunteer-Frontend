import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepagesComponent } from './managepages.component';

describe('ManagepagesComponent', () => {
  let component: ManagepagesComponent;
  let fixture: ComponentFixture<ManagepagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagepagesComponent]
    });
    fixture = TestBed.createComponent(ManagepagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
