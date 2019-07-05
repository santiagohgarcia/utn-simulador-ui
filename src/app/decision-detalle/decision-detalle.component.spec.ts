import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionDetalleComponent } from './decision-detalle.component';

describe('DecisionDetalleComponent', () => {
  let component: DecisionDetalleComponent;
  let fixture: ComponentFixture<DecisionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
