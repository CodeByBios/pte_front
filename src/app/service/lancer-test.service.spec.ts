import { TestBed, inject } from '@angular/core/testing';

import { LancerTestService } from './lancer-test.service';

describe('LancerTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LancerTestService]
    });
  });

  it('should be created', inject([LancerTestService], (service: LancerTestService) => {
    expect(service).toBeTruthy();
  }));
});
