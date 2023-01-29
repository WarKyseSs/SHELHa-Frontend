import { TestBed } from '@angular/core/testing';

import { ImplantationService } from './implantation.service';

describe('ImplantationService', () => {
  let service: ImplantationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImplantationService);
  });

  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
