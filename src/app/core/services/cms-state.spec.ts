import { TestBed } from '@angular/core/testing';

import { CmsState } from './cms-state';

describe('CmsState', () => {
  let service: CmsState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmsState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
