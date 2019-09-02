import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscenarioDetalleComponent } from './escenario-detalle.component';

describe('EscenarioDetalleComponent', () => {
  let component: EscenarioDetalleComponent;
  let fixture: ComponentFixture<EscenarioDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscenarioDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscenarioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
