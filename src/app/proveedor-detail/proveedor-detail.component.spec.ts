import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorDetailComponent } from './proveedor-detail.component';

describe('ProveedorDetailComponent', () => {
  let component: ProveedorDetailComponent;
  let fixture: ComponentFixture<ProveedorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
