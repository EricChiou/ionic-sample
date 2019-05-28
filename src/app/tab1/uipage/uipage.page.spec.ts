import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UIpagePage } from './uipage.page';

describe('UIpagePage', () => {
  let component: UIpagePage;
  let fixture: ComponentFixture<UIpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UIpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UIpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
