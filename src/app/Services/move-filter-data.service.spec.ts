import { TestBed } from '@angular/core/testing';

import { MoveFilterDataService } from './move-filter-data.service';

describe('MoveFilterDataService', () => {
  let service: MoveFilterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveFilterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
