import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviecartComponent } from './moviecart.component';

describe('MoviecartComponent', () => {
  let component: MoviecartComponent;
  let fixture: ComponentFixture<MoviecartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviecartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviecartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
