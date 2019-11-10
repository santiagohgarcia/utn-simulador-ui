import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosAdminComponent } from './resultados-admin.component';

describe('ResultadosAdminComponent', () => {
  let component: ResultadosAdminComponent;
  let fixture: ComponentFixture<ResultadosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
