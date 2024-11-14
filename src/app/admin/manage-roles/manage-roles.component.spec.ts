import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageRolesComponent } from './manage-roles.component';

describe('ManageRolesComponent', () => {
  let component: ManageRolesComponent;
  let fixture: ComponentFixture<ManageRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageRolesComponent]
    });
    fixture = TestBed.createComponent(ManageRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});