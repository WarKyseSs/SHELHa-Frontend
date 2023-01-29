import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';

describe('ForumPostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
