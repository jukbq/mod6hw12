import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SighInComponent } from './sigh-in.component';

describe('SighInComponent', () => {
  let component: SighInComponent;
  let fixture: ComponentFixture<SighInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SighInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SighInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
