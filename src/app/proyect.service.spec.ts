import { TestBed, inject } from '@angular/core/testing';

import { ProyectService } from './proyect.service';

describe('ProyectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProyectService]
    });
  });

  it('should be created', inject([ProyectService], (service: ProyectService) => {
    expect(service).toBeTruthy();
  }));
});
