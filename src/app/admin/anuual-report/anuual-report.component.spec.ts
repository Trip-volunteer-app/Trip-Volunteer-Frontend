import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuualReportComponent } from './anuual-report.component';

describe('AnuualReportComponent', () => {
  let component: AnuualReportComponent;
  let fixture: ComponentFixture<AnuualReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnuualReportComponent]
    });
    fixture = TestBed.createComponent(AnuualReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
