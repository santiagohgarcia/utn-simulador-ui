import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceFinalComponent } from './balance-final.component';

describe('BalanceFinalComponent', () => {
  let component: BalanceFinalComponent;
  let fixture: ComponentFixture<BalanceFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
