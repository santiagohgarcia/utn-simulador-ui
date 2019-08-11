import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoFondosComponent } from './flujo-fondos.component';

describe('FlujoFondosComponent', () => {
  let component: FlujoFondosComponent;
  let fixture: ComponentFixture<FlujoFondosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlujoFondosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoFondosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
