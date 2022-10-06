import { TestBed } from '@angular/core/testing';
import { ComponentsService } from './comments.service';

describe('CategoryService', () => {
  let service: ComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
