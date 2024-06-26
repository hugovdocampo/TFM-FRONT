import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPlanComponent } from './map-plan.component';

describe('MapPlanComponent', () => {
  let component: MapPlanComponent;
  let fixture: ComponentFixture<MapPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
