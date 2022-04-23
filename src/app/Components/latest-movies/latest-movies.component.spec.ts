import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestMoviesComponent } from './latest-movies.component';

describe('LatestMoviesComponent', () => {
  let component: LatestMoviesComponent;
  let fixture: ComponentFixture<LatestMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
