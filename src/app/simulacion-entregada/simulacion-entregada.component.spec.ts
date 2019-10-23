import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionEntregadaComponent } from './simulacion-entregada.component';

describe('SimulacionEntregadaComponent', () => {
  let component: SimulacionEntregadaComponent;
  let fixture: ComponentFixture<SimulacionEntregadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacionEntregadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionEntregadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
