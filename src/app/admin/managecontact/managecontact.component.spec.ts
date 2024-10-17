import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecontactComponent } from './managecontact.component';

describe('ManagecontactComponent', () => {
  let component: ManagecontactComponent;
  let fixture: ComponentFixture<ManagecontactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagecontactComponent]
    });
    fixture = TestBed.createComponent(ManagecontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
