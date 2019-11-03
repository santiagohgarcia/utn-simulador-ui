import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiosDetailComponent } from './premios-detail.component';

describe('PremiosDetailComponent', () => {
  let component: PremiosDetailComponent;
  let fixture: ComponentFixture<PremiosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
