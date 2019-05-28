import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidespagePage } from './slidespage.page';

describe('SlidespagePage', () => {
  let component: SlidespagePage;
  let fixture: ComponentFixture<SlidespagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidespagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidespagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
