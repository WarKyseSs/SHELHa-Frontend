import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';

describe('ImplantationService', () => {
  let service: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
