import { TestBed } from '@angular/core/testing';

import { DecisionesService } from './decisiones.service';

describe('DecisionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecisionesService = TestBed.get(DecisionesService);
    expect(service).toBeTruthy();
  });
});
