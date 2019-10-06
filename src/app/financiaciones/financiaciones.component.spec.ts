import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciacionesComponent } from './financiaciones.component';

describe('FinanciacionesComponent', () => {
  let component: FinanciacionesComponent;
  let fixture: ComponentFixture<FinanciacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanciacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanciacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
