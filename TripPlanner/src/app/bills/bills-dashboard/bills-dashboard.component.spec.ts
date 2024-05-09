import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsDashboardComponent } from './bills-dashboard.component';

describe('BillsDashboardComponent', () => {
  let component: BillsDashboardComponent;
  let fixture: ComponentFixture<BillsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillsDashboardComponent]
    });
    fixture = TestBed.createComponent(BillsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
