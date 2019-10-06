import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoJuegosComponent } from './estado-juegos.component';

describe('EstadoJuegosComponent', () => {
  let component: EstadoJuegosComponent;
  let fixture: ComponentFixture<EstadoJuegosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoJuegosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
