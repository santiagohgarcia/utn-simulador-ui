import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoJuegoDetailComponent } from './estado-juego-detail.component';

describe('EstadoJuegoDetailComponent', () => {
  let component: EstadoJuegoDetailComponent;
  let fixture: ComponentFixture<EstadoJuegoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoJuegoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoJuegoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
