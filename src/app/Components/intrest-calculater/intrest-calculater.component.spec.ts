import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrestCalculaterComponent } from './intrest-calculater.component';

describe('IntrestCalculaterComponent', () => {
  let component: IntrestCalculaterComponent;
  let fixture: ComponentFixture<IntrestCalculaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrestCalculaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrestCalculaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
