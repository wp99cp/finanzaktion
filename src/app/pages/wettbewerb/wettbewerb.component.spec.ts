import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WettbewerbComponent } from './wettbewerb.component';

describe('WettbewerbComponent', () => {
  let component: WettbewerbComponent;
  let fixture: ComponentFixture<WettbewerbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WettbewerbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WettbewerbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
