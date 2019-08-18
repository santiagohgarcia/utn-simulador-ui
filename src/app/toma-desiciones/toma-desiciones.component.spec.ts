import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaDesicionesComponent } from './toma-desiciones.component';

describe('TomaDesicionesComponent', () => {
  let component: TomaDesicionesComponent;
  let fixture: ComponentFixture<TomaDesicionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomaDesicionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaDesicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
