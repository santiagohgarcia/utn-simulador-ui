import { TestBed } from '@angular/core/testing';

import { FinanciacionService } from './financiacion.service';

describe('FinanciacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinanciacionService = TestBed.get(FinanciacionService);
    expect(service).toBeTruthy();
  });
});
