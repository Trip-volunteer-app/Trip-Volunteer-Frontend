import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWebsiteInfoComponent } from './manage-website-info.component';

describe('ManageWebsiteInfoComponent', () => {
  let component: ManageWebsiteInfoComponent;
  let fixture: ComponentFixture<ManageWebsiteInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageWebsiteInfoComponent]
    });
    fixture = TestBed.createComponent(ManageWebsiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
