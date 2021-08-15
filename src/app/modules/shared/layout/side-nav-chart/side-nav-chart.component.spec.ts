import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavChartComponent } from './side-nav-chart.component';

describe('SideNavChartComponent', () => {
  let component: SideNavChartComponent;
  let fixture: ComponentFixture<SideNavChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
