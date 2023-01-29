import { TestBed } from '@angular/core/testing';

import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesService);
  });

  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
