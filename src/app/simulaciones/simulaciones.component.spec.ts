import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionesComponent } from './simulaciones.component';

describe('SimulacionesComponent', () => {
  let component: SimulacionesComponent;
  let fixture: ComponentFixture<SimulacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
