import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirektSpendeComponent } from './direkt-spende.component';

describe('DirektSpendeComponent', () => {
  let component: DirektSpendeComponent;
  let fixture: ComponentFixture<DirektSpendeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirektSpendeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirektSpendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
