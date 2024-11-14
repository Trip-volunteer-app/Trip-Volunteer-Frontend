import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageaboutComponent } from './manageabout.component';

describe('ManageaboutComponent', () => {
  let component: ManageaboutComponent;
  let fixture: ComponentFixture<ManageaboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageaboutComponent]
    });
    fixture = TestBed.createComponent(ManageaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});