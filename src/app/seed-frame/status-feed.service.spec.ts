import { TestBed } from '@angular/core/testing';

import { StatusFeedService } from './status-feed.service';

describe('StatusFeedService', () => {
  let service: StatusFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
