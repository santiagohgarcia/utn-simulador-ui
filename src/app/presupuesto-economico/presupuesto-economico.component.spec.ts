import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoEconomicoComponent } from './presupuesto-economico.component';

describe('PresupuestoEconomicoComponent', () => {
  let component: PresupuestoEconomicoComponent;
  let fixture: ComponentFixture<PresupuestoEconomicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresupuestoEconomicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestoEconomicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
