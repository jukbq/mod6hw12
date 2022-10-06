import { TestBed } from '@angular/core/testing';

import { GoodsInfoResolver } from './goods-info.resolver';

describe('GoodsInfoResolver', () => {
  let resolver: GoodsInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GoodsInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
