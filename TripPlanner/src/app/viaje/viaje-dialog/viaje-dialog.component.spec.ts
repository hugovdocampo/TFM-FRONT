import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeDialogComponent } from './viaje-dialog.component';

describe('ViajeDialogComponent', () => {
  let component: ViajeDialogComponent;
  let fixture: ComponentFixture<ViajeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViajeDialogComponent]
    });
    fixture = TestBed.createComponent(ViajeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
