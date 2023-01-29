import { TestBed } from '@angular/core/testing';

import { TopicsAdminService } from './topics-admin.service';

describe('TopicsAdminService', () => {
  let service: TopicsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicsAdminService);
  });

  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
