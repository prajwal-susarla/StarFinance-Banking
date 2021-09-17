import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldVerificationComponent } from './gold-verification.component';

describe('GoldVerificationComponent', () => {
  let component: GoldVerificationComponent;
  let fixture: ComponentFixture<GoldVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
