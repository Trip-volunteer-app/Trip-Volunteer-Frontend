import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTripServicesComponent } from './manage-trip-services.component';

describe('ManageTripServicesComponent', () => {
  let component: ManageTripServicesComponent;
  let fixture: ComponentFixture<ManageTripServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTripServicesComponent]
    });
    fixture = TestBed.createComponent(ManageTripServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});