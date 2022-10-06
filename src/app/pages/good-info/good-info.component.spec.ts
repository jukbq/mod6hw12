import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoodInfoComponent } from './good-info.component';

describe('CoodInfoComponent', () => {
  let component: CoodInfoComponent;
  let fixture: ComponentFixture<CoodInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoodInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoodInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
