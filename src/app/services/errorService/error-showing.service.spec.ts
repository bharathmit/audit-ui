import { TestBed } from '@angular/core/testing';

import { ErrorShowingService } from './error-showing.service';

describe('ErrorShowingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorShowingService = TestBed.get(ErrorShowingService);
    expect(service).toBeTruthy();
  });
});
