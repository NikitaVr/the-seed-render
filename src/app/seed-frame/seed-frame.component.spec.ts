import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedFrameComponent } from './seed-frame.component';

describe('SeedFrameComponent', () => {
  let component: SeedFrameComponent;
  let fixture: ComponentFixture<SeedFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
