import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoFinancieroComponent } from './presupuesto-financiero.component';

describe('PresupuestoFinancieroComponent', () => {
  let component: PresupuestoFinancieroComponent;
  let fixture: ComponentFixture<PresupuestoFinancieroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresupuestoFinancieroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestoFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
