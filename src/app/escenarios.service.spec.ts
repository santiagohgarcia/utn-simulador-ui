import { TestBed } from '@angular/core/testing';

import { EscenariosService } from './escenarios.service';

describe('EscenariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscenariosService = TestBed.get(EscenariosService);
    expect(service).toBeTruthy();
  });
});
