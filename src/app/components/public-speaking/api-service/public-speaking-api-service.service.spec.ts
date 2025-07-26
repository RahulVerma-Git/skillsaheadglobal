import { TestBed } from '@angular/core/testing';

import { PublicSpeakingApiServiceService } from './public-speaking-api-service.service';

describe('PublicSpeakingApiServiceService', () => {
  let service: PublicSpeakingApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicSpeakingApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
