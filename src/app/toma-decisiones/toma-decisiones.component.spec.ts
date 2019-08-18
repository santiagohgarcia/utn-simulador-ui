import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaDecisionesComponent } from './toma-decisiones.component';

describe('TomaDesicionesComponent', () => {
  let component: TomaDecisionesComponent;
  let fixture: ComponentFixture<TomaDecisionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomaDecisionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaDecisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
