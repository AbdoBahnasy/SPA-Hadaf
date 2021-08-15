import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCardEmployeeComponent } from './dashboard-card-employee.component';

describe('DashboardCardEmployeeComponent', () => {
  let component: DashboardCardEmployeeComponent;
  let fixture: ComponentFixture<DashboardCardEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCardEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
