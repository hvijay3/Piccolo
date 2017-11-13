import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtheruserComponent } from './otheruser.component';

describe('OtheruserComponent', () => {
  let component: OtheruserComponent;
  let fixture: ComponentFixture<OtheruserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtheruserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtheruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
