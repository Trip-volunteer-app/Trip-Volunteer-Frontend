import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagehomepageComponent } from './managehomepage.component';

describe('ManagehomepageComponent', () => {
  let component: ManagehomepageComponent;
  let fixture: ComponentFixture<ManagehomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagehomepageComponent]
    });
    fixture = TestBed.createComponent(ManagehomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
