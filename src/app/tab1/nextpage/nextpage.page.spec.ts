import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextpagePage } from './nextpage.page';

describe('NextpagePage', () => {
  let component: NextpagePage;
  let fixture: ComponentFixture<NextpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
